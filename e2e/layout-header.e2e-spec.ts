/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout-header', () => {
  beforeEach((done) => {
    browser.get('#/layout/layout-header-test.component').then(() => done());
  });

  it('should render default header', () => {
    element(by.css('nb-layout-header > nav'))
      .getAttribute('class')
      .then((value) => {
        expect(value).toBeDefined();
      });
  });
});
