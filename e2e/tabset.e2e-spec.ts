import { expect, test } from '@playwright/test';
import { openExample } from './e2e-helper';

test.describe('nb-tabset', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/tabset/tabset-test.component'));
  test('should display default tabset', async ({ page }) => {
    const tabset = page.locator('nb-tabset').first();
    const tabs = tabset.locator('> ul > li');
    await expect(tabs.nth(0)).toHaveText('Tab #1');
    await expect(tabset.locator('> nb-tab[tabTitle="Tab #1"] > span')).toHaveText('Content #1');
    await expect(tabs.nth(1)).toHaveText('Tab #2');
    await expect(tabs.nth(2)).toHaveText('Tab #3');
  });
});
