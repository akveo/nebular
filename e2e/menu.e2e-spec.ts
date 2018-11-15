/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, by, element } from 'protractor';

import { hasClass } from './e2e-helper';

const group = by.css('#menu-first ul li:nth-child(1) span');
const menu1 = by.css('#menu-first ul li:nth-child(2) a');

describe('nb-menu', () => {

  beforeEach((done) => {
    browser.get('#/menu/menu-test.component').then(() => done());
  });

  it('should display group title', () => {
    element.all(group).first().getText()
      .then(val => {
        expect(val).toEqual('Menu Items');
      });
  });

  it('should display menu', () => {
    expect(element(by.css('#menu-first')).isDisplayed()).toBeTruthy();
    expect(browser.getCurrentUrl()).toContain('#/menu/menu-test.component/1');
  });

  it('should be selected - Menu #1', () => {
    element.all(menu1).first().getText()
      .then(val => {
        expect(val).toEqual('Menu #1');
      });

    element.all(menu1).first().click()
      .then(() => {
        expect(hasClass(element.all(menu1).first(), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('#/menu/menu-test.component/1');
      });
  });
});
