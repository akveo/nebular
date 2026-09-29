import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-layout', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/layout/layout-test.component'));
  test('should render container', async ({ page }) => {
    await expect(page.locator('#layout-fluid > div')).toHaveClass(/scrollable-container/);
  });
});
