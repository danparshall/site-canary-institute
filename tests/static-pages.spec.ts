import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Pages copied verbatim into public/ from other repos. They skip the Astro
// layout, so the site header has to reach them another way.
const staticPages = [
  {
    path: 'research/open-problems/',
    dist: 'research/open-problems/index.html',
    h1: /Open problems in AI compute verification/,
  },
  {
    path: 'research/open-problems/problems/P001.html',
    dist: 'research/open-problems/problems/P001.html',
    h1: /Seals and tamper-evident monitoring of servers and racks/,
  },
  {
    path: 'research/stampede/',
    dist: 'research/stampede/index.html',
    h1: /When should we pause\?/,
  },
];

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Research', href: '/research/' },
  { label: 'Policy', href: '/policy/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Verification', href: '/blog/most-important-problem/' },
];

for (const { path, dist, h1 } of staticPages) {
  test(`/${path} has exactly one site header, with the full nav`, async ({ page }) => {
    await page.goto(path);
    const banner = page.getByRole('banner');
    await expect(banner).toHaveCount(1);
    const links = banner.locator('nav a');
    await expect(links).toHaveText(nav.map((n) => n.label));
    for (const [i, { href }] of nav.entries()) {
      await expect(links.nth(i)).toHaveAttribute('href', href);
    }
  });

  test(`/${path} header logo is styled and links back to the home page`, async ({ page }) => {
    await page.goto(path);
    const logo = page.getByRole('banner').getByRole('img', { name: 'The Canary Institute' });
    const box = await logo.boundingBox();
    expect(box?.height).toBeCloseTo(64, 0);
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test(`/${path} keeps its own heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1, name: h1 })).toBeVisible();
  });

  test(`/${path} site header passes accessibility checks`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).include('[role="banner"], body > header').analyze();
    expect(results.violations).toEqual([]);
  });

  test(`/${path} production build carries the site header`, async () => {
    const html = readFileSync(join(process.cwd(), 'dist', dist), 'utf-8');
    expect(html).toContain('alt="The Canary Institute"');
    expect(html).toContain('href="/blog/most-important-problem/"');
    expect(html).toMatch(h1);
  });
}
