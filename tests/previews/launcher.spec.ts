import { expect, test, type Page } from '@playwright/test';
import { experiences } from '../../src/workspace/experiences.dev';

async function checkClubPreview(page: Page, variant: string) {
  await page.getByRole('button', { name: 'Variants' }).click();
  await expect(page.getByRole('dialog')).toContainText('Viewing ' + variant + ' ·');
}

async function checkTwitterPreview(page: Page) {
  await expect(page.getByRole('heading', { name: 'Big Tech Club', exact: true })).toBeVisible();
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
            await checkClubPreview(page, group.name);
            break;
          case 'Twitter profile':
            await checkTwitterPreview(page);
            break;
          case 'Email':
            await expect(page.getByRole('heading', { name: link.label })).toBeVisible();
            break;
          default:
            throw new Error('Add preview verification for ' + app.name);
        }
      });
    }
  }
}
