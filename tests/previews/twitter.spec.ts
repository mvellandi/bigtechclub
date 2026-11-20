import { expect, test } from '@playwright/test';
import { emptyProfileScenario } from '../../src/twitter/manifest.dev';

test('Twitter profile renders posts', async ({ page }) => {
  await page.goto('/twitter/');
  await expect(page.getByRole('heading', { name: 'Big Tech Club', exact: true })).toBeVisible();
  await expect(page.getByRole('article').first()).toBeVisible();
});

test('Twitter profile renders an empty post collection', async ({ page }) => {
  await page.goto('/twitter/?scenario=' + emptyProfileScenario);
  await expect(page.getByText('No posts yet.', { exact: true })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(0);
});
