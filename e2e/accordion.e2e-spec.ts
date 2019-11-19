/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by, Key } from 'protractor';

import { hasClass } from './e2e-helper';

describe('accordion', () => {
  beforeEach(done => {
    browser.get('#/accordion/accordion-test.component').then(() => done());
  });

  it('should display the 4 accordion items', () => {
    expect(element.all(by.css('nb-accordion > nb-accordion-item')).count()).toEqual(4);

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header'),
      ).getText(),
    ).toEqual('Accordion #1', 'fist item title');

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(2) > nb-accordion-item-header'),
      ).getText(),
    ).toEqual('Accordion #2', 'second item title');

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(2)')), 'collapsed'),
    ).toBeTruthy('second is collapsed');

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header'),
      ).getText(),
    ).toEqual('Accordion #3', 'third item title');

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')), 'expanded'),
    ).toBeTruthy('second is expanded');
  });

  describe('a11y', () => {

    it('should be interactable through keyboard', () => {
      expect(
        hasClass(
          element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')) , 'expanded',
        ),
      ).toBeTruthy();

      return element(by.css('nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header'))
        .sendKeys(Key.ENTER)
        .then(() => {
            expect(
              hasClass(
                element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')), 'collapsed',
              ),
            ).toBeTruthy('nb-accordion-item is collapsed');
        })
    })
  })
});
