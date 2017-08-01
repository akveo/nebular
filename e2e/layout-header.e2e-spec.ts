/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout-header', () => {

  beforeEach(() => {
    browser.get('#/layout/header');
  });

  it('should render default header', () => {
    element(by.css('nb-layout-header > nav')).getAttribute('class').then(value => {
      expect(value).toBeDefined();
    });
  });

  it('should stick fixed header', () => {
    element(by.css('nb-layout-header[fixed]')).getCssValue('position').then(value => {
      expect(value).toEqual('fixed');
    });
  });

  it('should be flex', () => {
    element(by.css('nb-layout-header nav')).getCssValue('display').then(value => {
      expect(value).toEqual('flex');
    });
  });

  it('should align items vertically', () => {
    element(by.css('nb-layout-header nav')).getCssValue('justify-content').then(value => {
      expect(value).toEqual('normal');
    });
  });

});
