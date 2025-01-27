/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout-footer', () => {
  beforeEach((done) => {
    browser.get('#/layout/layout-footer-test.component').then(() => done());
  });

  it('should render default footer', () => {
    element(by.css('nb-layout-footer > nav'))
      .getAttribute('class')
      .then((value) => {
        expect(value).toBeDefined();
      });
  });
});
