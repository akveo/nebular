import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('accordion', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/accordion/accordion-test.component'));
  test('should display the 4 accordion items', async ({ page }) => {
    const items = page.locator('nb-accordion > nb-accordion-item');
    await expect(items).toHaveCount(4);
    await expect(items.nth(0).locator('nb-accordion-item-header')).toHaveText('Accordion #1');
    await expect(items.nth(1).locator('nb-accordion-item-header')).toHaveText('Accordion #2');
    await expect(items.nth(1)).toHaveClass(/collapsed/);
    await expect(items.nth(2).locator('nb-accordion-item-header')).toHaveText('Accordion #3');
    await expect(items.nth(2)).toHaveClass(/expanded/);
  });
  test.describe('a11y', () => {
    test('should be interactable through keyboard', async ({ page }) => {
      const item = page.locator('nb-accordion > nb-accordion-item').nth(2);
      await expect(item).toHaveClass(/expanded/);
      await item.locator('nb-accordion-item-header').press('Enter');
      await expect(item).toHaveClass(/collapsed/);
    });
  });
});
