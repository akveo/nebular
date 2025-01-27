/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { hasClass } from './e2e-helper';
import { protractor } from 'protractor/built/ptor';

const EC = protractor.ExpectedConditions;
const WAIT_TIME = 1500;

describe('nb-search', () => {
  beforeEach((done) => {
    browser.get('#/search/search-test.component').then(() => done());
  });

  it('should be able to show search-field', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-search-field')), 'show')).toBeTruthy();
  });
});
