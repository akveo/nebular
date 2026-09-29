import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-route-tabset', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/tabset/route-tabset-showcase.component'));
  test('should display default route-tabset', async ({ page }) => {
    const tabs = page.locator('nb-card').first().locator('nb-route-tabset > ul > li');
    await expect(tabs.nth(0)).toHaveText('Users');
    await expect(tabs.nth(1)).toHaveText('Orders');
  });
});
