/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

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

  it('should expand a first accordion-item', () => {
    element(by.css('nb-accordion > nb-accordion-item:nth-child(1)')).click();

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(1)')), 'expanded'),
    ).toBeTruthy();

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(3)')), 'collapsed'),
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
      element(by.css('nb-accordion > nb-accordion-item:nth-child(4) > nb-accordion-item-header')).getAttribute(
        'tabindex',
      ),
    ).toEqual('-1');
  });

  it('should display a disabled accordion item', () => {
    expect(
      element(by.css('nb-accordion > nb-accordion-item:nth-child(4) > nb-accordion-item-header')).getAttribute(
        'aria-disabled',
      ),
    ).toEqual('true');

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(4)')), 'disabled'),
    ).toBeTruthy();
  });

  it('should display a disabled accordion with collapsed state after click', () => {
    element(by.css('nb-accordion > nb-accordion-item:nth-child(4)')).click();

    expect(
      hasClass(element(by.css('nb-accordion > nb-accordion-item:nth-child(4)')), 'collapsed'),
    ).toBeTruthy();
  });
});
