/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-route-tabset', () => {
  beforeEach((done) => {
    browser.get('#/tabset/route-tabset-showcase.component').then(() => done());
  });

  it('should display default route-tabset', () => {
    expect(element(by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(1)'))
      .getText()).toEqual('USERS');

    expect(element(by.css('nb-card:nth-child(1) nb-route-tabset > ul > li:nth-child(2)'))
      .getText()).toEqual('ORDERS');
  });
});
