import { test, expect } from '@playwright/test';

test('a paragraph after a bullet list in a blog post is separated from it', async ({ page }) => {
  await page.goto('blog/most-important-problem/');

  const gaps = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.post-body > ul, .post-body > ol'))
      .filter((list) => list.nextElementSibling?.tagName === 'P')
      .map((list) => {
        const next = list.nextElementSibling!;
        return Math.round(next.getBoundingClientRect().top - list.getBoundingClientRect().bottom);
      }),
  );

  expect(gaps.length).toBeGreaterThan(0);
  // Paragraphs are spaced 16px apart; a list should get the same breathing room.
  expect(gaps.filter((gap) => gap < 16)).toEqual([]);
});
