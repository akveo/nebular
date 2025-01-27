/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout', () => {
  beforeEach((done) => {
    browser.get('#/layout/layout-test.component').then(() => done());
  });

  it('should render container', () => {
    element(by.css('#layout-fluid > div'))
      .getAttribute('class')
      .then((value) => {
        expect(value).toMatch('scrollable-container');
      });
  });
});
