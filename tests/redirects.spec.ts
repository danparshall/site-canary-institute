import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

test('/verification lands on the most important problem post', async ({ page }) => {
  await page.goto('verification');
  await expect(page).toHaveURL(/\/blog\/most-important-problem\/$/);
});

test('/verification/ with a trailing slash lands on the same post', async ({ page }) => {
  await page.goto('verification/');
  await expect(page).toHaveURL(/\/blog\/most-important-problem\/$/);
});

// GitHub Pages serves the built files and cannot send HTTP redirects, so the
// production build has to carry a page that forwards the browser itself.
test('production build forwards /verification/ to the post', async () => {
  const html = readFileSync(join(process.cwd(), 'dist', 'verification', 'index.html'), 'utf-8');
  expect(html).toContain('http-equiv="refresh" content="0;url=/blog/most-important-problem/"');
  expect(html).toContain('rel="canonical" href="https://canaryinstitute.ai/blog/most-important-problem/"');
});
