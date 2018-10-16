/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, by, element } from 'protractor';

function getComputedProperty(property: string, selector: string) {
  const script = `
    return window.getComputedStyle(
      document.querySelector('${selector}'),
      ':before'
    ).${property};
  `;

  return browser.executeScript(script);
}

describe('nb-checkbox', () => {
  const transparent = 'rgba(0, 0, 0, 0)';

  const border_color = 'rgb(218, 223, 230)';
  const checked_color = 'rgb(64, 220, 126)';
  const outline_color = 'rgb(107, 228, 155)';

  const warning_color = 'rgb(255, 161, 0)';
  const warning_hover = 'rgb(255, 180, 51)';

  const danger_color = 'rgb(255, 76, 106)';
  const danger_hover = 'rgb(255, 127, 148)';


  beforeEach((done) => {
    browser.get('#/checkbox/checkbox-test.component').then(() => done());
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
    const otherElement = element(by.css('#danger .customised-control-indicator'));

    // unchecked
    expect(input.getAttribute('checked')).toBeFalsy();
    expect(indicator.getCssValue('background-color')).toEqual(transparent);
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + border_color);

    // check ::before styles
    getComputedProperty('content', '#first .customised-control-indicator')
      .then(data => expect(data).toBe('""'));

    getComputedProperty('borderTopColor', '#first .customised-control-indicator')
      .then(data => expect(data).toBe(transparent));

    indicator.click();
    // change focus to another input, so .focus styles removed.
    otherElement.click();

    // checked
    expect(input.getAttribute('checked')).toBeTruthy();
    expect(indicator.getCssValue('background-color')).toEqual(transparent);
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + checked_color);

    // check ::before styles
    getComputedProperty('content', '#first .customised-control-indicator')
      .then(data => expect(data).toBe('""'));

    getComputedProperty('borderTopColor', '#first .customised-control-indicator')
      .then(data => expect(data).toBe('rgb(42, 42, 42)'));
  });

  it('should apply style if hover', () => {
    const indicator = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + border_color);

    browser.actions().mouseMove(indicator).perform();

    // hover
    expect(indicator.getCssValue('border')).toEqual('2px solid ' + outline_color);
  });

  it('should apply status style', () => {
    const success = element(by.css('#success .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(success.getCssValue('border-color')).toEqual(border_color);

    // checked & focus
    success.click();
    expect(success.getCssValue('border-color')).toEqual(outline_color);

    // checked w/o focus
    other.click();
    expect(success.getCssValue('border-color')).toEqual(checked_color);

  });

  it('should apply style if status warning', () => {
    const warning = element(by.css('#warning .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(warning.getCssValue('border-color')).toEqual(border_color);

    // checked & focus
    warning.click();
    expect(warning.getCssValue('border-color')).toEqual(warning_hover);

    // checked w/o focus
    other.click();
    expect(warning.getCssValue('border-color')).toEqual(warning_color);
  });

  it('should apply style if status danger', () => {
    const danger = element(by.css('#danger .customised-control-indicator'));
    const other = element(by.css('#first .customised-control-indicator'));

    // without hover
    expect(danger.getCssValue('border-color')).toEqual(border_color);

    // checked & focus
    danger.click();
    expect(danger.getCssValue('border-color')).toEqual(danger_hover);

    // checked w/o focus
    other.click();
    expect(danger.getCssValue('border-color')).toEqual(danger_color);

  });
});
