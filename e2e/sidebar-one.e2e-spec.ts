/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar-one', () => {

  beforeEach(() => {
    browser.get('#/sidebar/one');
  });

  it('should render sidebar full pages', () => {
    element(by.css('nb-layout')).getSize().then(size => {
      element.all(by.css('nb-sidebar')).get(0).getSize().then(sidebarSize => {
        expect(sidebarSize.height).toEqual(size.height);
        expect(sidebarSize.width).toEqual(256);
      });
    });
  });

  it('should render correct flex property', () => {
    element.all(by.css('nb-sidebar')).get(0).getCssValue('flex').then(value => {
      expect(value).toMatch('0 1 auto');
    });
  });

  it('should render sidebar default sidebar at left', () => {
    element.all(by.css('nb-sidebar')).get(0).getCssValue('order').then(value => {
      expect(value).toMatch('0');
    });
  });

  it('should render right sidebar at right', () => {
    element(by.css('nb-sidebar[right]')).getCssValue('order').then(value => {
      expect(value).toMatch('2');
    });
  });

});
