import { expect, test } from '@playwright/test';
import { chatSizes, colors } from './component-shared';
import { openExample } from './e2e-helper';

const chats = colors.flatMap(({ colorKey, color }) =>
  chatSizes.map(({ sizeKey, height }) => ({ colorKey, color, size: sizeKey, height })),
);

test.describe('nb-chat', () => {
  test.beforeEach(({ page }) => openExample(page, '/#/chat/chat-test.component'));
  chats.forEach((chat, index) => {
    test(`should display ${chat.colorKey} chat with ${chat.size} size`, async ({ page }) => {
      const element = page.locator('nb-chat').nth(index);
      await expect(element).toHaveCSS('height', chat.height);
      await expect(element.locator('.header')).toHaveCSS('background-color', chat.color);
    });
  });
});
