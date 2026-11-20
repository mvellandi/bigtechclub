import { expect, test } from '@playwright/test';
import program from '../../src/data/fixtures/program.json' with { type: 'json' };
import inProgress from '../../src/twitter/variants/live-desk/session-in-progress.json' with { type: 'json' };
import recap from '../../src/twitter/variants/live-desk/session-recap.json' with { type: 'json' };

const entry = '/twitter/?variant=live-desk';

test('Live Desk latest update opens its club resource', async ({ page }) => {
  await page.goto(entry + '&scenario=session-in-progress');
  await expect(page.getByRole('heading', { name: inProgress.session.topic, exact: true })).toBeVisible();
  await expect(page.getByText(inProgress.session.label, { exact: true })).toBeVisible();

  const latest = page.getByRole('article').filter({ has: page.getByText('Latest update', { exact: true }) });
  await expect(latest).toHaveCount(1);
  await expect(latest).toContainText(inProgress.posts[0].text);
  await latest.getByRole('link', { name: inProgress.posts[0].label, exact: true }).click();

  await expect(page).toHaveURL(/\/club-web\/#\/live$/);
  await expect(page.getByRole('heading', { name: program.live.title, exact: true })).toBeVisible();
});

test('Live Desk recap URL opens the completed-session state in a fresh tab', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(entry + '&scenario=session-recap');

  await expect(page.getByText(recap.session.label, { exact: true })).toBeVisible();
  await expect(page.getByText('Session in progress', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: recap.session.topic, exact: true })).toBeVisible();

  const latest = page.getByRole('article').filter({ has: page.getByText('Latest update', { exact: true }) });
  await expect(latest).toContainText(recap.posts[0].text);
  await expect(latest.getByRole('link', { name: recap.posts[0].label, exact: true })).toBeVisible();
});
