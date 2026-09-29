import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-sidebar-three', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/sidebar/sidebar-three-test.component'));
  test('should render sidebar hidden', async ({ page }) => {
    const sidebar = page.locator('nb-sidebar[state="collapsed"]').first();
    await expect(sidebar).toHaveCSS('width', '0px');
  });
});
