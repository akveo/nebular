import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-toggle', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/toggle/toggle-test.component'));
  test('should turn on on click', async ({ page }) => {
    const input = page.locator('#first input');
    const indicator = page.locator('#first .toggle');
    await expect(input).not.toBeChecked();
    await indicator.click();
    await expect(input).toBeChecked();
    await indicator.click();
    await expect(input).not.toBeChecked();
  });
});
