/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-one', () => {

  beforeEach((done) => {
    browser.get('#/sidebar/sidebar-one-test.component').then(() => done());
  });

  it('should render sidebar full pages', () => {
    element(by.css('nb-layout')).getSize().then(size => {
      element.all(by.css('nb-sidebar')).get(0).getSize().then(sidebarSize => {
        expect(sidebarSize.height).toEqual(size.height);
        expect(sidebarSize.width).toEqual(256);
      });
    });
  });
});
