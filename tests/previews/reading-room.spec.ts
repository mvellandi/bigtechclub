import { expect, test, type Page } from '@playwright/test';

const entry = '/club-web/?variant=reading-room';
const firstChapter = entry + '#/book/frame';

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
}

test('Reading Room chapter preview opens from the launcher in a fresh tab', async ({ page, context }) => {
  await page.goto('/');
  const appRow = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Club Web', exact: true }) });
  await appRow.getByLabel('Club Web previews').click();
  const previews = appRow.locator('.preview-group').filter({ has: page.getByRole('heading', { name: 'Reading Room', exact: true }) });
  await expect(previews.getByRole('link')).toHaveCount(2);
  const href = await previews.getByRole('link', { name: 'Chapter 1 · Frame the problem', exact: true }).getAttribute('href');
  expect(href).not.toBeNull();

  const freshTab = await context.newPage();
  await freshTab.goto(new URL(href!, page.url()).href);
  await freshTab.reload();
  await expect(freshTab.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
  await expect(freshTab.getByText('Chapter 1 of 5', { exact: true })).toBeVisible();
  await expect(freshTab.getByRole('link', { name: 'Next chapter: Ground the system', exact: true })).toBeVisible();
  await freshTab.close();
});

test('Reading Room supports keyboard chapter navigation and a constrained reading width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(firstChapter);
  const next = page.getByRole('link', { name: 'Next chapter: Ground the system', exact: true });
  await next.focus();
  await expect(next).toBeFocused();
  await expect(next).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(entry + '#/book/ground');
  await expect(page.getByRole('heading', { name: 'Ground the system', exact: true })).toBeVisible();
  await expect(page.getByText('Chapter 2 of 5', { exact: true })).toBeVisible();
  const main = page.getByRole('main');
  await expect(main).toBeFocused();
  await page.keyboard.press('Tab');
  const contents = main.getByRole('link', { name: 'Table of contents', exact: true });
  await expect(contents).toBeFocused();
  await expect(contents).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(entry + '#/');
  await expect(page.getByRole('heading', { name: 'Table of contents', exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(firstChapter);
  await expect(page.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
  const articleWidth = await page.locator('.rr-article').evaluate(element => element.getBoundingClientRect().width);
  expect(articleWidth).toBeLessThanOrEqual(641);
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await expectNoHorizontalOverflow(page);
});

test('Reading Room canonicalizes /book and handles unknown chapters and the final chapter', async ({ page }) => {
  await page.goto(entry + '#/book');
  await expect(page).toHaveURL(entry + '#/');
  await expect(page.getByRole('heading', { name: 'Table of contents', exact: true })).toBeVisible();

  await page.goto(entry + '#/book/not-a-chapter');
  await expect(page.getByRole('heading', { name: 'Chapter not found', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to table of contents', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /^Next chapter:/ })).toHaveCount(0);

  await page.goto(entry + '#/book/operate');
  await expect(page.getByRole('heading', { name: 'Operate in production', exact: true })).toBeVisible();
  await expect(page.getByText('Chapter 5 of 5', { exact: true })).toBeVisible();
  await expect(page.getByText('End of the book', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Previous chapter: Evaluate behavior', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /^Next chapter:/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Return to table of contents', exact: true })).toBeVisible();
});

test('Pocket Atlas opens the same chapter in Reading Room', async ({ page }) => {
  await page.goto('/club-web/#/book/frame');
  await expect(page.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Variants' }).click();
  const dialog = page.getByRole('dialog');
  const readingRoom = dialog.locator('section').filter({ has: page.getByRole('heading', { name: 'Reading Room', exact: true }) });
  await readingRoom.getByRole('link', { name: 'Open this page in Reading Room', exact: true }).click();
  await expect(page).toHaveURL(firstChapter);
  await expect(page.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
  await expect(page.getByText('Chapter 1 of 5', { exact: true })).toBeVisible();
});

test('Pocket Atlas directory offers the Reading Room home when the route is unavailable', async ({ page }) => {
  await page.goto('/club-web/#/members');
  await page.getByRole('button', { name: 'Variants' }).click();
  const dialog = page.getByRole('dialog');
  const readingRoom = dialog.locator('section').filter({ has: page.getByRole('heading', { name: 'Reading Room', exact: true }) });
  await expect(readingRoom).toContainText('This page is unavailable in Reading Room.');
  await expect(readingRoom.getByRole('link', { name: 'Open this page in Reading Room', exact: true })).toHaveCount(0);
  await readingRoom.getByRole('link', { name: 'Open Reading Room home', exact: true }).click();
  await expect(page).toHaveURL(entry + '#/');
  await expect(page.getByRole('heading', { name: 'Table of contents', exact: true })).toBeVisible();
});
