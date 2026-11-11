import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-popover', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/popover/popover-test.component'));
  test('render template ref', async ({ page }) => {
    const trigger = page.locator('nb-card').first().locator('button').first();
    await trigger.click();
    const popover = page.locator('nb-layout nb-popover');
    await expect(popover.locator('nb-card')).toBeVisible();
    await trigger.click();
    await expect(popover).toBeHidden();
  });
});
