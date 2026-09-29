import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-layout theme', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/layout/theme-change-test.component'));
  test('should render default theme', async ({ page }) => {
    await expect(page.locator('body')).toHaveClass(/nb-theme-default/);
  });
  test('should switch theme', async ({ page }) => {
    const body = page.locator('body');
    const header = page.locator('nb-card-header');
    const button = page.locator('#change-theme');
    await button.click();
    await expect(body).toHaveClass('nb-theme-cosmic');
    await expect(header).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(header).toHaveCSS('text-decoration-line', 'none');
    await button.click();
    await expect(body).toHaveClass('nb-theme-default');
    await expect(header).toHaveCSS('color', 'rgb(34, 43, 69)');
    await expect(header).toHaveCSS('text-decoration-line', 'none');
  });
});
