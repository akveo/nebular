/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { sizes } from './cards-shared';
import { protractor } from 'protractor/built/ptor';

function toInt(cssValue) {
  return parseInt(cssValue, 10);
}

const waitTime = 1000;

const cards = sizes.map((size, i) => ({
  size,
  i,
}));

describe('nb-reveal-card', () => {
  beforeEach((done) => {
    browser.get('#/card-status').then(() => done());
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
          revealCard.getCssValue('margin-bottom'),
        ]).then(([ backCardTop, cardHeight, cardMargin ]) => {
          expect(revealCard.getAttribute('class')).not.toContain('revealed', `card shouldn't has 'revealed' class`);
          expect(frontCard.isDisplayed()).toBe(true, 'front card should be visible');
          expect(toInt(backCardTop)).toEqual(toInt(cardHeight) - toInt(cardMargin), 'back card should be hidden');
        });
      }

      it(`should show only front card`, showOnlyFrontCard);

      it(`should reveal back card`, () => {
        const revealCard = element.all(by.tagName('nb-reveal-card')).get(c.i);
        const backCardContainer = revealCard.all(by.css('.second-card-container')).first();
        const revealButton = revealCard.all(by.css('.reveal-button')).first();

        revealButton.click().then(() => {
          expect(revealCard.getAttribute('class')).toContain('revealed', `card should has 'revealed' class`);
          backCardContainer
            .getCssValue('top')
            .then(top => expect(toInt(top)).toEqual(0, 'revealed card should be visible'));
        });
      });

      it(`should hide back card`, () => {
        const revealCard = element.all(by.tagName('nb-reveal-card')).get(c.i);
        const revealButton = revealCard.all(by.css('.reveal-button')).first();

        revealButton.click()
          .then(() => revealButton.click())
          .then(() => {
            browser.sleep(waitTime);
            showOnlyFrontCard();
          });
      });
    });
  });
});
