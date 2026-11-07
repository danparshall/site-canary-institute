// Astro integration that adds the site header to standalone HTML pages under
// public/. Those pages are copied verbatim from other repos (the open-problem
// list and the stampede widget are rendered in danparshall/verification), so
// they skip the Astro layout. The header is added when the page is served in
// dev and when the build is written to dist/, never to the files in public/,
// which stay byte-identical to their renders.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { navLinks } from './nav-links.mjs';

const STATIC_PAGE_DIRS = ['research/open-problems', 'research/stampede'];
const MARKER = 'data-canary-site-header';

// Mirrors Nav.astro's styles. Colours are fixed (the site has no dark mode)
// so the header looks the same whatever theme the host page picks.
const STYLE = `<style ${MARKER}>
.canary-site-header { border-bottom: 1px solid #e5e5e3; background: #fff; }
.canary-site-header .canary-nav-container { display: flex; align-items: center; justify-content: space-between;
  height: 5.5rem; max-width: 800px; margin: 0 auto; padding: 0 1.5rem; box-sizing: border-box; }
.canary-site-header .canary-logo-link { display: flex; align-items: center; }
.canary-site-header .canary-logo { height: 4rem; width: auto; display: block; }
.canary-site-header nav { display: flex; gap: 2rem; }
.canary-site-header nav a { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0.875rem;
  line-height: 1.7; letter-spacing: 0.05em; text-transform: uppercase; color: #436058; text-decoration: none;
  transition: color 0.2s; }
.canary-site-header nav a:hover { color: #1A2A28; }
@media (max-width: 600px) {
  .canary-site-header .canary-nav-container { flex-direction: column; height: auto; padding-top: 1rem;
    padding-bottom: 0.75rem; gap: 0.75rem; }
  .canary-site-header nav { gap: 1.25rem; flex-wrap: wrap; justify-content: center; }
  .canary-site-header nav a { font-size: 0.8rem; }
}
</style>`;

function headerHtml(base) {
  const links = navLinks.map(({ path, label }) => `<a href="${base}${path}">${label}</a>`).join('');
  return `<header class="canary-site-header"><div class="canary-nav-container">`
    + `<a href="${base}" class="canary-logo-link"><img src="${base}canary_base.svg" alt="The Canary Institute" class="canary-logo"></a>`
    + `<nav aria-label="Site">${links}</nav></div></header>`;
}

export function addSiteHeader(html, base = '/') {
  if (html.includes(MARKER)) return html;
  const withStyle = html.replace(/<\/head>/i, `${STYLE}\n</head>`);
  return withStyle.replace(/<body[^>]*>/i, (body) => `${body}\n${headerHtml(base)}`);
}

function isStaticPagePath(relPath) {
  return STATIC_PAGE_DIRS.some((dir) => relPath === dir || relPath.startsWith(`${dir}/`));
}

async function htmlFilesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((e) => e.isFile() && e.name.endsWith('.html')).map((e) => join(e.parentPath, e.name));
}

export default function staticSiteHeader() {
  let base = '/';
  let publicDir;
  return {
    name: 'static-site-header',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.endsWith('/') ? config.base : `${config.base}/`;
        publicDir = fileURLToPath(config.publicDir);
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
          if (!urlPath.startsWith(base)) return next();
          let rel = normalize(urlPath.slice(base.length)).replace(/\/+$/, '');
          if (!isStaticPagePath(rel)) return next();
          let file = join(publicDir, rel);
          const info = await stat(file).catch(() => null);
          if (info?.isDirectory()) file = join(file, 'index.html');
          if (!file.endsWith('.html')) return next();
          const html = await readFile(file, 'utf-8').catch(() => null);
          if (html === null) return next();
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(addSiteHeader(html, base));
        });
      },
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        for (const pageDir of STATIC_PAGE_DIRS) {
          const root = join(distDir, pageDir);
          const exists = await stat(root).catch(() => null);
          if (!exists) continue;
          for (const file of await htmlFilesUnder(root)) {
            const html = await readFile(file, 'utf-8');
            await writeFile(file, addSiteHeader(html, base));
          }
        }
      },
    },
  };
}
