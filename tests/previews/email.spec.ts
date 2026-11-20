import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import book from '../../src/data/fixtures/book.json' with { type: 'json' };

test('chapter email previews the published files and links to the chapter', async ({ page, request }) => {
  const chapter = book.chapters[0];
  const chapterUrl = new URL('https://bigtechclub.com/club-web/#/book/frame');
  const [html, text, metadata] = await Promise.all(
    ['index.html', 'chapter-announcement.txt', 'message.json'].map(async name => {
      const artifact = await readFile('docs/email/' + name, 'utf8');
      const response = await request.get('/email/' + name);
      expect(await response.text()).toBe(artifact);
      return artifact;
    })
  );
  expect(JSON.parse(metadata)).toEqual({ subject: book.title + ' · Chapter 1: ' + chapter.title, preheader: chapter.summary });
  expect(text).toContain(chapter.sections[0].text);
  expect(text).toContain(chapterUrl.href);

  await page.setViewportSize({ width: 320, height: 640 });
  const preview = await page.goto('/email/');
  expect(await preview!.text()).toBe(html);
  await expect(page).toHaveTitle(chapter.title + ' · Big Tech Club');
  await expect(page.locator('[data-skip-in-text]').filter({ hasText: chapter.summary })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: chapter.title })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read chapter 1' })).toHaveAttribute('href', chapterUrl.href);
  await expect(page.locator('script, link[rel="stylesheet"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);

  await page.goto(chapterUrl.pathname + chapterUrl.hash);
  await expect(page.getByRole('heading', { name: chapter.title, exact: true })).toBeVisible();
});
