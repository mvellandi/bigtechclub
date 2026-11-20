import { expect, test, type Page } from '@playwright/test';
import { experiences } from '../../src/workspace/experiences.dev';

async function checkClubPreview(page: Page, variant: string, label: string) {
  switch (label) {
    case 'Home':
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      break;
    case 'Members in Berlin':
      await expect(page.getByRole('main').getByRole('status')).toHaveText('2 members');
      await expect(page.getByRole('link', { name: 'Mina Rao' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Luca Meyer' })).toBeVisible();
      break;
    case 'No matches':
      await expect(page.getByRole('heading', { name: 'No members on this trail' })).toBeVisible();
      await expect(page.getByRole('main').getByRole('status')).toHaveText('0 members');
      break;
    case 'Table of contents':
      await expect(page.getByRole('heading', { name: 'AI Engineering Atlas', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Table of contents', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Begin with chapter one' })).toBeVisible();
      break;
    case 'Chapter 1 · Frame the problem':
      await expect(page.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
      await expect(page.getByText('Chapter 1 of 5', { exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Next chapter: Ground the system', exact: true })).toBeVisible();
      await page.reload();
      await expect(page.getByRole('heading', { name: 'Frame the problem', exact: true })).toBeVisible();
      await expect(page.getByText('Chapter 1 of 5', { exact: true })).toBeVisible();
      break;
    default:
      throw new Error('Add a Club Web assertion for ' + label);
  }

  await page.getByRole('button', { name: 'Variants' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Viewing ' + variant + ' ·');
  if (label === 'Members in Berlin' || label === 'No matches') await expect(dialog).toContainText(label);
}

async function checkTwitterPreview(page: Page, label: string) {
  await expect(page.getByRole('heading', { name: 'Big Tech Club', exact: true })).toBeVisible();
  switch (label) {
    case 'With posts':
      await expect(page.getByRole('article').first()).toBeVisible();
      break;
    case 'No posts':
      await expect(page.getByText('No posts yet.', { exact: true })).toBeVisible();
      await expect(page.getByRole('article')).toHaveCount(0);
      break;
    default:
      throw new Error('Add a Twitter assertion for ' + label);
  }
}

for (const app of experiences) {
  for (const group of app.previews) {
    for (const link of group.links) {
      test([app.name, group.name, link.label].join(' / '), async ({ page }) => {
        await page.goto('/');
        const appRow = page.locator('section').filter({ has: page.getByRole('heading', { name: app.name, exact: true }) });
        await appRow.getByLabel(app.name + ' previews').click();
        const previews = appRow.locator('.preview-group').filter({ has: page.getByRole('heading', { name: group.name, exact: true }) });
        const destination = new URL(link.href, page.url()).href;
        await previews.getByRole('link', { name: link.label, exact: true }).click();
        await expect(page).toHaveURL(destination);

        switch (app.name) {
          case 'Club Web':
            await checkClubPreview(page, group.name, link.label);
            break;
          case 'Twitter profile':
            await checkTwitterPreview(page, link.label);
            break;
          default:
            throw new Error('Add preview assertions for ' + app.name);
        }
      });
    }
  }
}
