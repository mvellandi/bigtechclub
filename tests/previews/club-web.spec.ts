import { expect, test } from '@playwright/test';

const variants = [
  { name: 'Pocket Atlas', entry: '/club-web/' },
  { name: 'Field Quest', entry: '/club-web/?variant=field-quest' },
];

for (const variant of variants) {
  test(`${variant.name} home page renders`, async ({ page }) => {
    await page.goto(variant.entry);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test(`${variant.name} directory filters members`, async ({ page }) => {
    await page.goto(variant.entry + '#/members?place=Berlin');
    await expect(page.getByRole('main').getByRole('status')).toHaveText('2 members');
    await expect(page.getByRole('link', { name: 'Mina Rao' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luca Meyer' })).toBeVisible();
  });

  test(`${variant.name} directory shows an empty result`, async ({ page }) => {
    await page.goto(variant.entry + '#/members?place=Berlin&specialty=Retrieval');
    await expect(page.getByRole('heading', { name: 'No members on this trail' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('status')).toHaveText('0 members');
  });
}
