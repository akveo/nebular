/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

import { hasClass } from './e2e-helper';

describe('accordion', () => {
  beforeEach(done => {
    browser.get('#/accordion').then(() => done());
  });

  it('should display the 3 accordion items', () => {
    expect(element.all(by.css('nb-accordion > nb-accordion-item')).count()).toEqual(3);

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header > nb-accordion-item-title'),
      ).getText(),
    ).toEqual('Accordion #1');
    expect(
      element(
        by.css(
          'nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header > nb-accordion-item-description',
        ),
      ).getText(),
    ).toEqual('Description #1');
    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(1)')), 'accordion-item-collapsed'),
    ).toBeTruthy();

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(2) > nb-accordion-item-header > nb-accordion-item-title'),
      ).getText(),
    ).toEqual('Accordion #2');
    expect(
      element(
        by.css(
          'nb-accordion > nb-accordion-item:nth-child(2) > nb-accordion-item-header > nb-accordion-item-description',
        ),
      ).getText(),
    ).toEqual('Description #2');
    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(2)')), 'accordion-item-collapsed'),
    ).toBeTruthy();

    expect(
      element(
        by.css('nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header > nb-accordion-item-title'),
      ).getText(),
    ).toEqual('Accordion #3');
    expect(
      element(
        by.css(
          'nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header > nb-accordion-item-description',
        ),
      ).getText(),
    ).toEqual('Description #3');
    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')), 'accordion-item-collapsed'),
    ).toBeTruthy();
  });

  it('should expande a first accordion-item', () => {
    element(by.css('nb-accordion > nb-accordion-item:nth-child(1)')).click();

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(1)')), 'accordion-item-expanded'),
    ).toBeTruthy();

    expect(
      hasClass(
        element(by.css('nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header')),
        'accordion-item-header-expanded',
      ),
    ).toBeTruthy();

    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header')).getAttribute(
        'aria-expanded',
      ),
    ).toEqual('true');
  });

  it('should display the tabbable accordion items', () => {
    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-header')).getAttribute(
        'tabindex',
      ),
    ).toEqual('0');

    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(2) > nb-accordion-item-header')).getAttribute(
        'tabindex',
      ),
    ).toEqual('0');

    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header')).getAttribute(
        'tabindex',
      ),
    ).toEqual('-1');
  });

  it('should display a disabled accordion item', () => {
    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(3) > nb-accordion-item-header')).getAttribute(
        'aria-disabled',
      ),
    ).toEqual('true');
  });

  it('should display a disabled accordion with collapsed state after click', () => {
    element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')).click();

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')), 'accordion-item-collapsed'),
    ).toBeTruthy();
  });
});
