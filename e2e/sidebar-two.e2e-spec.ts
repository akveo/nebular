/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-two', () => {

  beforeEach(() => {
    browser.get('#/sidebar/two');
  });

  // it('should render right fixed sidebar height equal layout height', () => {
  //   Promise.all([
  //     element(by.css('nb-layout')).getSize(),
  //     element(by.css('nb-sidebar[fixed]')).getSize(),
  //     element(by.css('nb-layout-header')).getSize(),
  //   ]).then(([layoutSize, sidebarSize, headerSize]) => {
  //     expect(sidebarSize.height).toEqual(layoutSize.height - headerSize.height);
  //   });
  // });

  it('should render left non-fixed sidebar height minus header', () => {
    Promise.all([
      element(by.css('nb-layout')).getSize(),
      element(by.css('nb-layout-header')).getSize(),
      element.all(by.css('nb-sidebar')).get(0).getSize(),
    ]).then(([layoutSize, headerSize, sidebarSize]) => {
      expect(sidebarSize.height).toEqual(layoutSize.height - headerSize.height);
    });
  });

  it('should render fixed sidebar with absolute position', () => {
    element(by.css('nb-sidebar[fixed]')).getCssValue('position').then(value => {
      expect(value).toMatch('fixed');
    });
  });

  it('should render fixed right sidebar at right', () => {
    element(by.css('nb-sidebar[right]')).getCssValue('right').then(value => {
      expect(value).toMatch('0');
    });
  });
});
