/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout-footer', () => {

  beforeEach((done) => {
    browser.get('#/layout/footer').then(() => done());
  });

  it('should render default footer', () => {
    element(by.css('nb-layout-footer > nav')).getAttribute('class').then(value => {
      expect(value).toBeDefined();
    });
  });

  it('should stick fixed footer', () => {
    element(by.css('nb-layout-footer[fixed]')).getCssValue('position').then(value => {
      expect(value).toEqual('static');
    });
  });

  it('should have height', () => {
    element(by.css('nb-layout-footer nav')).getCssValue('height').then(value => {
      expect(value).toEqual('75.5938px');
    });
  });

  it('should be flex', () => {
    element(by.css('nb-layout-footer nav')).getCssValue('display').then(value => {
      expect(value).toEqual('flex');
    });
  });

  it('should align items vertically', () => {
    element(by.css('nb-layout-footer nav')).getCssValue('justify-content').then(value => {
      expect(value).toEqual('center');
    });
  });

});
