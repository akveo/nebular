/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-two', () => {
  beforeEach((done) => {
    browser.get('#/sidebar/sidebar-two-test.component').then(() => done());
  });

  it('should render left non-fixed sidebar height minus header', () => {
    Promise.all<any>([
      element(by.css('nb-layout')).getSize(),
      element(by.css('nb-layout-header')).getSize(),
      element.all(by.css('nb-sidebar')).get(0).getSize(),
    ]).then(([layoutSize, headerSize, sidebarSize]) => {
      expect(sidebarSize.height).toEqual(layoutSize.height - headerSize.height);
    });
  });
});
