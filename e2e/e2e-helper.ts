import { expect, Locator, Page } from '@playwright/test';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const hasClass = async (locator: Locator, cls: string): Promise<boolean> => {
  const classes = (await locator.getAttribute('class')) || '';
  return classes.split(/\s+/).includes(cls);
};

export const hexToRgbA = (hex: string, alpha = 1): string => {
  let c: string[] | string;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const value = Number(`0x${c.join('')}`);
    const channels = `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
    return alpha === 1 ? `rgb(${channels})` : `rgba(${channels}, ${alpha})`;
  }
  throw new Error('Bad Hex');
};

export async function openExample(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('npg-app-root')).toBeAttached();
}
