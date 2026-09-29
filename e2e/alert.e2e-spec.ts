import { expect, test } from '@playwright/test';
import { alertSizes, colors } from './component-shared';
import { openExample } from './e2e-helper';

const alerts = colors.flatMap(({ colorKey, color }) =>
  alertSizes.map(({ sizeKey, height }) => ({ colorKey, color, size: sizeKey, height })),
);

test.describe('nb-alert', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/alert/alert-test.component'));
  alerts.forEach((alert, index) => {
    test(`should display ${alert.colorKey} alert with ${alert.size} size`, async ({ page }) => {
      const element = page.locator('nb-alert').nth(index);
      await expect(element).toContainText('Success message!');
      await expect(element).toHaveCSS('height', alert.height);
      await expect(element).toHaveCSS('background-color', alert.color);
    });
  });
});
