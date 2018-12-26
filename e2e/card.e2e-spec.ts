/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { colors, cardSizes as sizes } from './component-shared';
import { waitFor } from './e2e-helper';

let cards: any[] = [];

function prepareCards() {
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

describe('nb-card', () => {

  cards = prepareCards();

  beforeAll((done) => {
    browser.get('#/card/card-test.component').then(() => done());
  });

  cards.forEach(c => {

    it(`should display ${c.colorKey} card with ${c.size} size`, () => {
      waitFor(`nb-card:nth-child(${c.elementNumber})`);
      expect(element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-header`))
        .getText()).toEqual('Header');
    });
  });
});
