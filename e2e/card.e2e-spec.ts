import { expect, test } from '@playwright/test';
import { cardSizes, colors } from './component-shared';
import { openExample } from './e2e-helper';

const cards = colors.flatMap(({ colorKey }) => cardSizes.map(({ sizeKey }) => ({ colorKey, size: sizeKey })));

test.describe('nb-card', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/card/card-test.component'));
  cards.forEach((card, index) => {
    test(`should display ${card.colorKey} card with ${card.size} size`, async ({ page }) => {
      await expect(page.locator('nb-card').nth(index).locator('> nb-card-header')).toHaveText('Header');
    });
  });
});
