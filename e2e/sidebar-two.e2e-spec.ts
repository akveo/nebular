import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-sidebar-two', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/sidebar/sidebar-two-test.component'));
  test('should render left non-fixed sidebar height minus header', async ({ page }) => {
    const [layout, header, sidebar] = await Promise.all([
      page.locator('nb-layout').boundingBox(),
      page.locator('nb-layout-header').boundingBox(),
      page.locator('nb-sidebar').first().boundingBox(),
    ]);
    expect(layout).not.toBeNull();
    expect(header).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(Math.round(sidebar!.height)).toBe(Math.round(layout!.height - header!.height));
  });
});
