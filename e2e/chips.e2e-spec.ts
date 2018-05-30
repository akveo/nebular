/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

import { hasClass, hexToRgbA } from './e2e-helper';

const colors = {
  default: hexToRgbA('#f2f2f2'),
  active: hexToRgbA('#a4abb3'),
  disabled: 'rgba(255, 255, 255, 0.4)',
  primary: hexToRgbA('#8a7fff'),
  info: hexToRgbA('#4ca6ff'),
  success: hexToRgbA('#40dc7e'),
  warning: hexToRgbA('#ffa100'),
  danger: hexToRgbA('#ff4c6a'),
};

describe('nb-chip-list', () => {
  it('nb-chip-list should has role attribute', () => {
    browser.get('#/chips/chips-showcase.component').then(() => {
      expect(element(by.css('nb-chip-list')).getAttribute('role')).toEqual('listbox');
    });
  });

  it('should display default chips', () => {
    browser.get('#/chips/chips-showcase.component').then(() => {
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getText()).toEqual('chip #1');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getAttribute('tabindex')).toEqual('-1');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getText()).toEqual('chip #2');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getAttribute('tabindex')).toEqual('-1');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getText()).toEqual('chip #3');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getAttribute('tabindex')).toEqual('-1');
    });
  });

  it('should display tabbable chips', () => {
    browser.get('#/chips/chips-tabbable.component').then(() => {
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getText()).toEqual('chip #1');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getAttribute('tabindex')).toEqual('0');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getText()).toEqual('chip #2');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getAttribute('tabindex')).toEqual('0');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getText()).toEqual('chip #3');
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getAttribute('tabindex')).toEqual('0');
    });
  });

  it('should display removable chips', () => {
    browser.get('#/chips/chips-removable.component').then(() => {
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getText()).toEqual('chip #1');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(1)')), 'removable-chip')).toBeTruthy();

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getText()).toEqual('chip #2');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(2)')), 'removable-chip')).toBeTruthy();

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getText()).toEqual('chip #3');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(3)')), 'removable-chip')).toBeTruthy();
    });
  });

  it('should remove first chip', () => {
    browser.get('#/chips/chips-removable.component').then(() => {
      element(by.css('nb-chip-list > nb-chip:nth-child(1) > .remove-icon')).click();

      expect(element.all(by.css('nb-chip-list > nb-chip')).count()).toEqual(2);

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getText()).toEqual('chip #2');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getText()).toEqual('chip #3');

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).isPresent()).toBeFalsy();
    });
  });

  it('should display colored chips', () => {
    browser.get('#/chips/chips-colors.component').then(() => {
      expect(element(by.css('nb-chip-list > nb-chip:nth-child(1)')).getText()).toEqual('default');
      element(by.css('nb-chip-list > nb-chip:nth-child(1)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['default']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(2)')).getText()).toEqual('active');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(2)')), 'active-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(2)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['active']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(3)')).getText()).toEqual('disabled');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(3)')), 'disabled-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(3)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['disabled']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(4)')).getText()).toEqual('primary');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(4)')), 'primary-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(4)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['primary']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(5)')).getText()).toEqual('info');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(5)')), 'info-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(5)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['info']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(6)')).getText()).toEqual('success');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(6)')), 'success-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(6)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['success']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(7)')).getText()).toEqual('warning');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(7)')), 'warning-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(7)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['warning']);
        });

      expect(element(by.css('nb-chip-list > nb-chip:nth-child(8)')).getText()).toEqual('danger');
      expect(hasClass(element(by.css('nb-chip-list > nb-chip:nth-child(8)')), 'danger-chip')).toBeTruthy();
      element(by.css('nb-chip-list > nb-chip:nth-child(8)'))
        .getCssValue('background-color')
        .then(value => {
          expect(value).toEqual(colors['danger']);
        });
    });
  });
});
