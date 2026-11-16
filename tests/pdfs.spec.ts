import { test, expect } from '@playwright/test';

const posters = [
  { title: 'Power-Grid Monitoring Can Detect Dark Compute', href: '/papers/techgov-2026-grid-monitoring-poster.pdf' },
  { title: 'Game Theory of Compute Verification', href: '/papers/techgov-2026-game-theory-poster.pdf' },
];

for (const { title, href } of posters) {
  test(`PDFs page lists the TechGov poster "${title}"`, async ({ page }) => {
    await page.goto('pdfs/');
    await expect(page.getByRole('link', { name: title })).toHaveAttribute('href', href);
  });

  test(`TechGov poster "${title}" is served as a PDF`, async ({ request }) => {
    const response = await request.get(href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });
}
