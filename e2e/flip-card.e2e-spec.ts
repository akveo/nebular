/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { sizes } from './cards-shared';

const waitTime = 500;

const cards = sizes.map((size, i) => ({ size, i }));

describe('nb-flip-card', () => {
  beforeEach((done) => {
    browser.get('#/card-status').then(() => done());
  });

  cards.forEach(c => {
    describe(`${c.size.sizeKey} flip card`, () => {
      function shouldShowFrontCard () {
        const flipCard = element.all(by.tagName('nb-flip-card')).get(c.i);
        const frontCard = flipCard.all(by.tagName('.front-container')).first();

        expect(flipCard.getAttribute('class')).not.toContain('flipped', `flip card shouldn't be flipped`)
        expect(frontCard.isDisplayed()).toBe(true, 'front card should be visible');
      }

      it(`should show front card`, shouldShowFrontCard);

      it(`should flip`, () => {
        const flipCard = element.all(by.tagName('nb-flip-card')).get(c.i);
        const frontCardFlipButton = flipCard.all(by.css('.flip-button')).first();

        frontCardFlipButton.click().then(() => {
          expect(flipCard.getAttribute('class')).toContain('flipped', 'flip card should be flipped');
        });
      });

      it(`should flip again`, () => {
        const flipCard = element.all(by.tagName('nb-flip-card')).get(c.i);
        const frontCardFlipButton = flipCard.all(by.css('.front-container .flip-button')).first();
        const backCardFlipButton = flipCard.all(by.css('.back-container .flip-button')).first();

        frontCardFlipButton.click()
          .then(() => {
            browser.sleep(waitTime);
            return backCardFlipButton.click()
          })
          .then(() => {
            browser.sleep(waitTime);
            shouldShowFrontCard();
          });
      });
    });
  });
});
