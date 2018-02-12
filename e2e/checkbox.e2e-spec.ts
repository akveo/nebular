/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, by, element } from 'protractor';

describe('nb-search', () => {
  const transparent = 'rgba(0, 0, 0, 0)';

  const border_color = 'rgb(218, 223, 230)';
  const checked_color = 'rgb(64, 220, 126)';
  const hover_color = 'rgb(107, 228, 155)';

  const warning_color = 'rgb(255, 161, 0)';
  const warning_hover = 'rgb(255, 180, 51)';

  const danger_color = 'rgb(255, 76, 106)';
  const danger_hover = 'rgb(255, 127, 148)';


  beforeEach((done) => {
    browser.get('#/checkbox').then(() => done());
  });

  it('should apply check on click', () => {
    const input = element(by.css('#first input'));
    const indicator = element(by.css('#first .customised-control-indicator'));

    expect(input.getAttribute('checked')).toBeFalsy();
    indicator.click();
    expect(input.getAttribute('checked')).toBeTruthy();
    indicator.click();
    expect(input.getAttribute('checked')).toBeFalsy();
  });

  it('should ignore click if disable', () => {
    const input = element(by.css('#disabled input'));
    const indicator = element(by.css('#disabled .customised-control-indicator'));

    expect(input.getAttribute('disabled')).toBeTruthy();
    expect(input.getAttribute('checked')).toBeFalsy();
    indicator.click();
    expect(input.getAttribute('checked')).toBeFalsy();
    expect(input.getAttribute('disabled')).toBeTruthy();
  });

  it('should apply style if checked/unchecked', () => {
    const input = element(by.css('#first input'));
    const indicator = element(by.css('#first .customised-control-indicator'));
    const otherElement = element(by.css('#danger'));

    // unchecked
    expect(input.getAttribute('checked')).toBeFalsy();
    expect(indicator.getCssValue('background-color')).toEqual(transparent);
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + border_color);

    // check ::before styles
    browser.executeScript(
      'return ' +
      'window.getComputedStyle(document.querySelector(' +
      '"#first .customised-control-indicator"' +
      '), ":before").content')
      .then(data => expect(data).toBe('""'));

    browser.executeScript(
      'return ' +
      'window.getComputedStyle(document.querySelector(' +
      '"#first .customised-control-indicator"' +
      '), ":before").borderTopColor')
      .then(data => expect(data).toBe(transparent));

    indicator.click();
    browser.actions().mouseMove(otherElement).perform();

    // checked
    expect(input.getAttribute('checked')).toBeTruthy();
    expect(indicator.getCssValue('background-color')).toEqual(transparent);
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + checked_color);

    // check ::before styles
    browser.executeScript(
      'return ' +
      'window.getComputedStyle(document.querySelector(' +
      '"#first .customised-control-indicator"' +
      '), ":before").content')
      .then(data => expect(data).toBe('""'));

    browser.executeScript(
      'return ' +
      'window.getComputedStyle(document.querySelector(' +
      '"#first .customised-control-indicator"' +
      '), ":before").borderTopColor')
      .then(data => {
        expect(data).toBe('rgb(42, 42, 42)');
      });
  });

  it('should apply style if hover', () => {
    const indicator = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + border_color);

    browser.actions().mouseMove(indicator).perform();

    // hover
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + hover_color);
  });

  it('should apply style if status success', () => {
    const success = element(by.css('#success .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(success.getCssValue('border-color')).toEqual(border_color);

    success.click();

    // hover
    expect(success.getCssValue('border-color')).toEqual(hover_color);

    // checked
    browser.actions().mouseMove(other).perform();
    expect(success.getCssValue('border-color')).toEqual(checked_color);

  });

  it('should apply style if status warning', () => {
    const warning = element(by.css('#warning .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(warning.getCssValue('border-color')).toEqual(border_color);

    warning.click();

    // hover
    expect(warning.getCssValue('border-color')).toEqual(warning_hover);

    // checked
    browser.actions().mouseMove(other).perform();
    expect(warning.getCssValue('border-color')).toEqual(warning_color);
  });

  it('should apply style if status danger', () => {
    const danger = element(by.css('#danger .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(danger.getCssValue('border-color')).toEqual(border_color);

    danger.click();

    // hover
    expect(danger.getCssValue('border-color')).toEqual(danger_hover);

    // checked
    browser.actions().mouseMove(other).perform();

    expect(danger.getCssValue('border-color')).toEqual(danger_color);

  });
});
