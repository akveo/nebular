import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-layout-header', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/layout/layout-header-test.component'));
  test('should render default header', async ({ page }) => {
    await expect(page.locator('nb-layout-header > nav')).toBeVisible();
  });
});
