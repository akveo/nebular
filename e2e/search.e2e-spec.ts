/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { hasClass } from './e2e-helper';
import { protractor } from 'protractor/built/ptor';

const EC = protractor.ExpectedConditions;
const WAIT_TIME = 500;

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

  it('should be able to change layout style', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-layout')), 'with-search')).toBeTruthy();
  });

  it('should focus on opened search field', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(hasClass(browser.driver.switchTo().activeElement(), 'search-input')).toBeTruthy();
  });

  it('should be able to close search-field with close button', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search button')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-search-field')), 'show')).toBeFalsy();
  });

  it('should remove class from layout when search closed', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search button')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-layout')), 'with-search')).toBeFalsy();
  });

  it('should remove focus from input when search closed', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search button')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(hasClass(browser.driver.switchTo().activeElement(), 'search-input')).toBeFalsy();
  });

  it('should clean search input when closed', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search-input')).sendKeys('akveo');
    element(by.css('.search button')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(element(by.css('.search-input')).getAttribute('value')).toEqual('');
  });

  it('should be able to close search-field with esc', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search-input')).sendKeys(protractor.Key.ESCAPE);
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-search-field')), 'show')).toBeFalsy();
    expect(hasClass(element(by.css('nb-layout')), 'with-search')).toBeFalsy();
    expect(hasClass(browser.driver.switchTo().activeElement(), 'search-input')).toBeFalsy();
    expect(element(by.css('.search-input')).getAttribute('value')).toEqual('');
  });

  it('should be able to submit search and close search-field with enter', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    element(by.css('.search-input')).sendKeys('akveo');
    element(by.css('.search-input')).sendKeys(protractor.Key.ENTER);
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.start-search'))), WAIT_TIME);
    expect(hasClass(element(by.css('nb-search-field')), 'show')).toBeFalsy();
    expect(hasClass(element(by.css('nb-layout')), 'with-search')).toBeFalsy();
    expect(hasClass(browser.driver.switchTo().activeElement(), 'search-input')).toBeFalsy();
    expect(element(by.css('.search-input')).getAttribute('value')).toEqual('');
  });

  it('should display default hint', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(element(by.css('.show .search span'))).toBeTruthy();

    const spanEl = element(by.css('.show .search span'));
    const text = 'Hit enter to search';
    browser.wait(EC.textToBePresentInElement(spanEl, text), 5000);
    expect(spanEl.getText()).toContain(text);
  });

  it('should display default placeholder', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(element(by.css('.search-input')).getAttribute('placeholder')).toEqual('Search...');
  });
});

describe('nb-search-customized', () => {

  beforeEach((done) => {
    browser.get('#/search/search-customized-test.component').then(() => done());
  });

  it('should display customised hint', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(element(by.css('.show .search span'))).toBeTruthy();

    const spanEl = element(by.css('.show .search span'));
    const text = 'Custom hint';
    browser.wait(EC.textToBePresentInElement(spanEl, text), 5000);
    expect(spanEl.getText()).toContain(text);
  });

  it('should display customised placeholder', () => {
    element(by.css('.start-search')).click();
    // TODO: Remove after implementing search animations with angular.
    // For now need to wait animation to complete before performing checks.
    browser.wait(EC.visibilityOf(element(by.css('.search-input'))), WAIT_TIME);
    expect(element(by.css('.search-input')).getAttribute('placeholder')).toEqual('Type here.');
  });
});
