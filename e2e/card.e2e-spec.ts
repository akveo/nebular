/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { colors, sizes } from './cards-shared';
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

function prepareAccentCards(regularCardsOffset) {
  function generateAccentCards(accentCardsOffset, colorKey, color) {
    return colors.map((c, i) => ({
      name: colorKey,
      colorKey,
      color,
      accentColor: c.color,
      accentKey: c.colorKey,
      elementNumber: regularCardsOffset + accentCardsOffset + i,
    }));
  }

  return colors.reduce((accentCards, { colorKey, color }) => {
    return accentCards.concat(generateAccentCards(accentCards.length, colorKey, color));
  }, []);
}

describe('nb-card', () => {

  cards = prepareCards();

  beforeEach((done) => {
    browser.get('#/card-status').then(() => done());
  });

  cards.forEach(c => {

    it(`should display ${c.colorKey} card with ${c.size} size`, () => {
      waitFor(`nb-card:nth-child(${c.elementNumber})`);
      expect(element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-header`))
        .getText()).toEqual('Header');

      if (c.size !== 'xxsmall') {
        expect(element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-body`))
          .getText()).toEqual('Body');

        expect(element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-footer`))
          .getText()).toEqual('Footer');
      }

      element(by.css(`nb-card:nth-child(${c.elementNumber})`)).getCssValue('height').then(height => {
        expect(height).toEqual(c.height);
      });

      element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-header`))
        .getCssValue('background-color').then(bgColor => {
          expect(bgColor).toEqual(c.color);
        });

      element(by.css(`nb-card:nth-child(${c.elementNumber}) > nb-card-header`))
        .getCssValue('border-bottom-color').then(bgColor => {
          expect(bgColor).toEqual(c.color);
        });
    });
  });

  const accentCards = prepareAccentCards(cards.length);
  accentCards.forEach(c => {
    it(`should display ${c.colorKey} card with ${c.accentKey} accent`, () => {
      element.all(by.css(`nb-card`))
        .get(c.elementNumber)
        .getCssValue('border-top-color').then(borderColor => {
          expect(borderColor).toEqual(c.accentColor, 'Accent is not correct');
        });
    });
  });
});
