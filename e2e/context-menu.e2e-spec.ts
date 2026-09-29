import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-context-menu', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/context-menu/context-menu-test.component'));
  test('have to hide when click on item', async ({ page }) => {
    await page.locator('nb-card').first().locator('nb-user').first().click();
    const item = page.locator('nb-context-menu nb-menu > ul > li').nth(2);
    await expect(item).toBeVisible();
    await item.click();
    await expect(item).toBeHidden();
  });
});
