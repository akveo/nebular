import { test } from '@playwright/test';
import badgeTests from './badge-shared';
import { openExample } from './e2e-helper';

test.describe('nb-action', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/action/action-test.component'));
  test.describe('badge', () => {
    badgeTests({
      selector: (i) => `nb-card:nth-child(4) nb-actions nb-action:nth-child(${i + 1}) nb-badge`,
      badges: [{ text: '29' }],
    });
  });
});
