import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-select', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/select/select-test.component'));
  test('should not shrink when has no placeholder and text', async ({ page }) => {
    const selects = page.locator('nb-select');
    await expect(selects).toHaveCount(5);
    for (const [index, height] of [24, 32, 40, 48, 56].entries()) {
      const select = selects.nth(index);
      await expect(select).toHaveText('');
      const box = await select.boundingBox();
      expect(box).not.toBeNull();
      expect(Math.abs(box!.height - height)).toBeLessThanOrEqual(1);
    }
  });
});
