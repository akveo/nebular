import { expect, test } from '@playwright/test';
import { cardSizes } from './component-shared';
import { openExample } from './e2e-helper';

test.describe('nb-reveal-card', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/card/card-test.component'));
  cardSizes.forEach((size, index) => {
    test.describe(`${size.sizeKey} reveal card`, () => {
      test('should show only front card', async ({ page }) => {
        const card = page.locator('nb-reveal-card').nth(index);
        await expect(card).not.toHaveClass(/revealed/);
        await expect(card.locator('nb-card-front')).toBeVisible();
        const [backTop, cardHeight] = await Promise.all([
          card.locator('.second-card-container').evaluate((node) => parseFloat(getComputedStyle(node).top)),
          card.evaluate((node) => parseFloat(getComputedStyle(node).height)),
        ]);
        expect(Math.round(backTop)).toBe(Math.round(cardHeight));
      });
    });
  });
});
