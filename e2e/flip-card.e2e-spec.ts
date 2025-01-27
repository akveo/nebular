/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { cardSizes as sizes } from './component-shared';

const cards = sizes.map((size, i) => ({ size, i }));

describe('nb-flip-card', () => {
  beforeEach((done) => {
    browser.get('#/card/card-test.component').then(() => done());
  });

  cards.forEach((c) => {
    describe(`${c.size.sizeKey} flip card`, () => {
      function shouldShowFrontCard() {
        const flipCard = element.all(by.tagName('nb-flip-card')).get(c.i);
        const frontCard = flipCard.all(by.tagName('.front-container')).first();

        expect(flipCard.getAttribute('class')).not.toContain('flipped', `flip card shouldn't be flipped`);
        expect(frontCard.isDisplayed()).toBe(true, 'front card should be visible');
      }

      it(`should show front card`, shouldShowFrontCard);
    });
  });
});
