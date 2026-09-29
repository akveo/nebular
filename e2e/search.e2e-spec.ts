import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-search', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/search/search-test.component'));
  test('should be able to show search-field', async ({ page }) => {
    await page.locator('.start-search').click();
    await expect(page.locator('.search-input')).toBeVisible();
    await expect(page.locator('nb-search-field')).toHaveClass(/show/);
  });
});
