import { expect, test } from '@playwright/test';
import { cardSizes } from './component-shared';
import { openExample } from './e2e-helper';

test.describe('nb-flip-card', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/card/card-test.component'));
  cardSizes.forEach((size, index) => {
    test.describe(`${size.sizeKey} flip card`, () => {
      test('should show front card', async ({ page }) => {
        const card = page.locator('nb-flip-card').nth(index);
        await expect(card).not.toHaveClass(/flipped/);
        await expect(card.locator('.front-container')).toBeVisible();
      });
    });
  });
});
