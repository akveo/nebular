/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

import { hasClass } from './e2e-helper';

describe('nb-route-tabset', () => {
  beforeEach((done) => {
    browser.get('#/tabset/route-tabset-showcase.component').then(() => done());
  });

  it('should display default route-tabset', () => {
    expect(element(by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(1)'))
      .getText()).toEqual('Users');

    expect(element(by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(2)'))
      .getText()).toEqual('Orders');
  });

  it('should change tabs of a route-tabset"', () => {
    const tab2 = by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(2)');

    element(tab2).click()
      .then(() => {
        expect(hasClass(element(tab2), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/route-tabset-showcase.component/tab2');
      });

    const tab1 = by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(1)');

    element(tab1).click()
      .then(() => {
        expect(hasClass(element(tab1), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/route-tabset-showcase.component/tab1');
      });
  });

  it('should display a full-width route-tabset', () => {
    const tab1 = by.css('nb-card:nth-child(2) nb-route-tabset > ul > li:nth-child(1)');

    expect(element(tab1)
      .getText()).toEqual('Users');

    const tab2 = by.css('nb-card:nth-child(2) nb-route-tabset > ul > li:nth-child(2)');

    expect(element(tab2)
      .getText()).toEqual('Orders');
  });

  it('should change tabs of a full-width route-tabset', () => {
    const tab2 = by.css('nb-card:nth-child(2) nb-route-tabset > ul > li:nth-child(2)');

    element(tab2).click()
      .then(() => {
        expect(hasClass(element(tab2), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/route-tabset-showcase.component/tab2');
      });

    const tab1 = by.css('nb-card:nth-child(2) nb-route-tabset > ul > li:nth-child(1)');

    element(tab1).click()
      .then(() => {
        expect(hasClass(element(tab1), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/route-tabset-showcase.component/tab1');
      });
  });
});
