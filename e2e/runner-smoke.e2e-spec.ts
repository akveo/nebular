import { expect, test } from '@playwright/test';

test('loads the playground shell through a direct route', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('npg-app-root')).toBeAttached();
});
