import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-sidebar-one', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/sidebar/sidebar-one-test.component'));
  test('should render sidebar full pages', async ({ page }) => {
    const layout = await page.locator('nb-layout').boundingBox();
    const sidebar = await page.locator('nb-sidebar').first().boundingBox();
    expect(layout).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(Math.round(sidebar!.height)).toBe(Math.round(layout!.height));
    expect(Math.round(sidebar!.width)).toBe(256);
  });
});
