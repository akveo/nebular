import { expect, test } from '@playwright/test';

test('renders the consumer application and a Nebular component', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('bs-root')).toBeAttached();
  await expect(page.locator('nb-card')).toContainText('Nebular Works!!!');
});
