/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-tabset', () => {
  beforeEach((done) => {
    browser.get('#/tabset/tabset-test.component').then(() => done());
  });

  it('should display default tabset', () => {
    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(1)')).getText()).toEqual('TAB #1');
    expect(element(by.css('nb-tabset:nth-child(1) > nb-tab[tabTitle="Tab #1"] > span'))
      .getText()).toEqual('Content #1');

    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(2)')).getText()).toEqual('TAB #2');
    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(3)')).getText()).toEqual('TAB #3');
  });
});
