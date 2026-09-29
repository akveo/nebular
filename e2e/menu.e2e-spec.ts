import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-menu', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/menu/menu-test.component'));
  test('should display group title', async ({ page }) => {
    await expect(page.locator('#menu-first ul li').nth(0).locator('span')).toHaveText('Menu Items');
  });
  test('should display menu', async ({ page }) => {
    await expect(page.locator('#menu-first')).toBeVisible();
    await expect(page).toHaveURL(/#\/menu\/menu-test\.component\/1/);
  });
  test('should be selected - Menu #1', async ({ page }) => {
    const menu = page.locator('#menu-first ul li').nth(1).locator('a');
    await expect(menu).toHaveText('Menu #1');
    await menu.click();
    await expect(menu).toHaveClass(/active/);
    await expect(page).toHaveURL(/#\/menu\/menu-test\.component\/1/);
  });
});
