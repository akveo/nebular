import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-checkbox', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/checkbox/checkbox-test.component'));
  test('should apply check on click', async ({ page }) => {
    const input = page.locator('#first input');
    const indicator = page.locator('#first .custom-checkbox');
    await expect(input).not.toBeChecked();
    await indicator.click();
    await expect(input).toBeChecked();
    await indicator.click();
    await expect(input).not.toBeChecked();
  });
});
