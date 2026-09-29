import { expect, test } from '@playwright/test';

interface BadgeConfig {
  selector: (index: number) => string;
  badges: Array<{ text: string }>;
}

export default function badgeTests({ selector, badges }: BadgeConfig): void {
  test('should display badge with correct text', async ({ page }) => {
    for (const [index, badge] of badges.entries()) {
      await expect(page.locator(selector(index))).toHaveText(badge.text);
    }
  });
}
