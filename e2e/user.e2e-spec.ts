import { expect, test } from '@playwright/test';
import badgeTests from './badge-shared';
import { openExample } from './e2e-helper';

test.describe('nb-user', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/user/user-test.component'));
  test.describe('badge', () => {
    badgeTests({
      selector: (i) => `.test-row:nth-child(${10 + i + 1}) nb-badge`,
      badges: [{ text: '29' }],
    });
  });
  test('background image should have base64 image', async ({ page }) => {
    await expect(page.locator('#base64-image .user-picture.image')).toHaveCSS(
      'background-image',
      'url("data:image/png;base64,aaa")',
    );
  });
});
