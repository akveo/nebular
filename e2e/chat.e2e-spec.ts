/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { colors, chatSizes as sizes } from './component-shared';
import { waitFor } from './e2e-helper';

let chats: any[] = [];

function prepareChats() {
  const result: any[] = [];

  let elementNumber: number = 1;
  for (const { colorKey, color } of colors) {
    for (const { sizeKey, height } of sizes) {
      result.push({
        size: sizeKey,
        height: height,
        colorKey,
        color,
        elementNumber,
      });
      elementNumber++;
    }
  }

  return result;
}

describe('nb-chat', () => {

  chats = prepareChats();

  beforeAll((done) => {
    browser.get('#/chat/chat-test.component').then(() => done());
  });

  chats.forEach(c => {

    it(`should display ${c.colorKey} chat with ${c.size} size`, () => {
      waitFor(`nb-chat:nth-child(${c.elementNumber})`);

      element(by.css(`nb-chat:nth-child(${c.elementNumber})`)).getCssValue('height').then(height => {
        expect(height).toEqual(c.height);
      });

      element(by.css(`nb-chat:nth-child(${c.elementNumber}) .header`))
        .getCssValue('background-color').then(bgColor => {
          expect(bgColor).toEqual(c.color);
        });
    });
  });
});
