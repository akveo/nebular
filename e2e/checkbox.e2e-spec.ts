/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, by, element } from 'protractor';

describe('nb-checkbox', () => {

  beforeEach((done) => {
    browser.get('#/checkbox/checkbox-test.component').then(() => done());
  });

  it('should apply check on click', () => {
    const input = element(by.css('#first input'));
    const indicator = element(by.css('#first .custom-checkbox'));

    expect(input.getAttribute('checked')).toBeFalsy();
    indicator.click();
    expect(input.getAttribute('checked')).toBeTruthy();
    indicator.click();
    expect(input.getAttribute('checked')).toBeFalsy();
  });
});
