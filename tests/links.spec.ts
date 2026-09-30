import { test, expect, type Page } from '@playwright/test';

const post = 'blog/most-important-problem/';

// Readers on touch devices get no hover cue, so a link in running content
// has to look like a link at rest.
const linkStyles = (page: Page, selector: string) =>
  page.evaluate(
    (sel) =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>(sel)).map((a) => {
        const style = getComputedStyle(a);
        const parentStyle = getComputedStyle(a.parentElement!);
        return {
          text: a.textContent?.trim().slice(0, 40) ?? '',
          underlined: style.textDecorationLine.includes('underline'),
          sameColorAsText: style.color === parentStyle.color,
        };
      }),
    selector,
  );

test('links inside bullet lists are underlined', async ({ page }) => {
  await page.goto(post);
  const links = await linkStyles(page, '.post-body li a');

  expect(links.length).toBeGreaterThan(10);
  expect(links.filter((l) => !l.underlined)).toEqual([]);
});

test('links inside bullet lists are a different colour from the text around them', async ({ page }) => {
  await page.goto(post);
  const links = await linkStyles(page, '.post-body li a');

  expect(links.length).toBeGreaterThan(10);
  expect(links.filter((l) => l.sameColorAsText)).toEqual([]);
});

test('links inside paragraphs are underlined and coloured', async ({ page }) => {
  await page.goto(post);
  const links = await linkStyles(page, '.post-body p a');

  expect(links.length).toBeGreaterThan(0);
  expect(links.filter((l) => !l.underlined || l.sameColorAsText)).toEqual([]);
});

test('blog index entries keep their card styling without an underline', async ({ page }) => {
  await page.goto('blog/');
  const links = await linkStyles(page, '.toc-entry a');

  expect(links.length).toBeGreaterThan(0);
  expect(links.filter((l) => l.underlined)).toEqual([]);
});
