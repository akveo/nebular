import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-layout-footer', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/layout/layout-footer-test.component'));
  test('should render default footer', async ({ page }) => {
    await expect(page.locator('nb-layout-footer > nav')).toBeVisible();
  });
});
