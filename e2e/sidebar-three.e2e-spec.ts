/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-three', () => {
  beforeEach((done) => {
    browser.get('#/sidebar/sidebar-three-test.component').then(() => done());
  });

  it('should render sidebar hidden', () => {
    element
      .all(by.css('nb-sidebar[state="collapsed"]'))
      .get(0)
      .getSize()
      .then((sidebarSize) => {
        expect(sidebarSize.width).toEqual(0);
      });
  });
});
