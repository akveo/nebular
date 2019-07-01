/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { cardSizes as sizes } from './component-shared';
import { protractor } from 'protractor/built/ptor';

function toInt(cssValue) {
  return parseInt(cssValue, 10);
}

const cards = sizes.map((size, i) => ({
  size,
  i,
}));

describe('nb-reveal-card', () => {
  beforeEach((done) => {
    browser.get('#/card/card-test.component').then(() => done());
  });

  cards.forEach(c => {
    describe(`${c.size.sizeKey} reveal card`, () => {
      function showOnlyFrontCard () {
        const revealCard = element.all(by.tagName('nb-reveal-card')).get(c.i);
        const frontCard = revealCard.all(by.tagName('nb-card-front')).first();
        const backCardContainer = revealCard.all(by.css('.second-card-container')).first();

        protractor.promise.all([
          backCardContainer.getCssValue('top'),
          revealCard.getCssValue('height'),
        ]).then(([ backCardTop, cardHeight ]) => {
          expect(revealCard.getAttribute('class')).not.toContain('revealed', `card shouldn't has 'revealed' class`);
          expect(frontCard.isDisplayed()).toBe(true, 'front card should be visible');
          expect(toInt(backCardTop)).toEqual(toInt(cardHeight), 'back card should be hidden');
        });
      }

      it(`should show only front card`, showOnlyFrontCard);
    });
  });
});
