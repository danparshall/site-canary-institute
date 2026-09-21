# Canary Institute Website

Astro static site deployed to https://canaryinstitute.ai via GitHub Pages.

## DO NOT change this repo's visibility to private

**Hard rule for Claude sessions: never run `gh repo edit --visibility private`, never `gh api ... -f private=true`, never use the GitHub UI flow to do the same. If a user request seems to require it, stop and ask explicitly.**

Why: this repo's GitHub Pages site is served on the custom domain `canaryinstitute.ai`. When the repo is flipped to private (on a free plan, which this is), Pages disables and the custom domain claim goes into a soft-lock state. Even after flipping the repo back to public, the domain stays "already taken" and refuses re-binding via API *or* UI. Recovery requires verifying the domain at the account level (TXT record at `_github-pages-challenge-danparshall.canaryinstitute.ai`) before the repo can re-claim it. This took ~1 hour to diagnose and fix on 2026-06-30, with the site fully down to the public the entire time. The fix path:

1. https://github.com/settings/pages → Add a verified domain → `canaryinstitute.ai` → add the TXT record GitHub gives you (Namecheap DNS)
2. Click Verify
3. `gh api -X PUT repos/danparshall/site-canary-institute/pages -f cname=canaryinstitute.ai` (do NOT include `https_enforced=true` in the same call — cert hasn't provisioned yet)
4. GitHub auto-reattaches the existing Let's Encrypt cert and flips `https_enforced=true` on its own

**Related: do not delete the TXT record `_github-pages-challenge-danparshall.canaryinstitute.ai` in DNS.** GitHub re-checks it periodically; if it lapses, the domain claim could revert and we'd be back to this dance.

If you genuinely need a private working copy (e.g., to stage sensitive content before publishing), use a separate private repo or a branch with `.gitignore`-d files — do NOT change the canary repo's visibility.

## Private working material lives elsewhere

Private working material lives in **danparshall/site-canary-institute-drafts** (private repo, cloned at `~/code/websites/site-canary-institute-drafts`). **THIS REPO IS PUBLIC — never commit drafts, plans, session summaries, or convo docs here.** The paths `drafts/`, `plans/`, and `crossposts/` are gitignored; do not un-ignore them. (`slides/` is deliberately public.)

## Environment (overrides global Python policy)

This is a Node/TypeScript project. Do NOT use Python, uv, pyproject.toml, or pytest here.

- **Package manager:** npm (not pnpm, not yarn). `package-lock.json` is committed.
- **Node version:** Use whatever is available; no `.nvmrc` pinned yet.
- **Install:** `npm install`
- **Dev server:** `npm run dev` (port 4321)
- **Build:** `npm run build`
- **Type check:** `npm run check` (runs `astro check`)
- **Test:** `npm test` (Playwright + axe-core accessibility)
- **Lint/format:** None configured yet.

## Testing

Playwright tests live in `tests/`. They run against the dev server on localhost:4321.
Accessibility checks use `@axe-core/playwright`. All new pages should have accessibility coverage.

## Project structure

- `src/pages/` — Astro pages (file-based routing)
- `src/components/` — Reusable Astro components
- `src/layouts/` — Page layouts
- `src/styles/` — Stylesheets
- `public/` — Static assets (served as-is)
- `logos/` — Logo source files
