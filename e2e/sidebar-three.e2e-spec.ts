/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-three', () => {

  beforeEach(() => {
    browser.get('#/sidebar/three');
  });

  it('should render sidebar hidden', () => {
    element.all(by.css('nb-sidebar[state="collapsed"]')).get(0).getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(0);
    });
  });

  it('should render sidebar compacted', () => {
    element.all(by.css('nb-sidebar[state="compacted"]')).get(0).getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(56);
    });
  });
});
