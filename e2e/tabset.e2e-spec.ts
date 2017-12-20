/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { hasClass } from './e2e-helper';
import Badge from '../src/framework/theme/components/badge/badge.component';

describe('nb-tabset', () => {
  beforeEach(() => {
    browser.get('#/tabset');
  });

  it('should display default tabset', () => {
    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(1)')).getText()).toEqual('Tab #1');
    expect(element(by.css('nb-tabset:nth-child(1) > nb-tab[tabTitle="Tab #1"] > span'))
      .getText()).toEqual('Content #1');

    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(2)')).getText()).toEqual('Tab #2');
    expect(element(by.css('nb-tabset:nth-child(1) > ul > li:nth-child(3)')).getText()).toEqual('Tab #3');
  });

  it('should change the tabs', () => {
    const tab2 = by.css('nb-tabset:nth-child(1) > ul > li:nth-child(2)');

    element(tab2).click()
      .then(() => {
        expect(hasClass(element(tab2), 'active')).toBeTruthy();
      });

    const tab3 = by.css('nb-tabset:nth-child(1) > ul > li:nth-child(3)');

    element(tab3).click()
      .then(() => {
        expect(hasClass(element(tab3), 'active')).toBeTruthy();
      });

    const tab1 = by.css('nb-tabset:nth-child(1) > ul > li:nth-child(1)');

    element(tab1).click()
      .then(() => {
        expect(hasClass(element(tab1), 'active')).toBeTruthy();
      });
  });

  it('should display tabset with second active tab', () => {
    expect(hasClass(element(by.css('nb-tabset:nth-child(2) > ul > li:nth-child(2)')), 'active'))
      .toBeTruthy();
  });

  it('should display tabset with third active tab', () => {
    expect(hasClass(element(by.css('nb-tabset:nth-child(3) > ul > li:nth-child(3)')), 'active'))
      .toBeTruthy();
  });

  it('should change the tabs with the enabled routes', () => {
    const tab2 = by.css('nb-tabset:nth-child(4) > ul > li:nth-child(2)');

    element(tab2).click()
      .then(() => {
        expect(hasClass(element(tab2), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/tab2');
      });

    const tab3 = by.css('nb-tabset:nth-child(4) > ul > li:nth-child(3)');

    element(tab3).click()
      .then(() => {
        expect(hasClass(element(tab3), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/tab3');
      });

    const tab1 = by.css('nb-tabset:nth-child(4) > ul > li:nth-child(1)');

    element(tab1).click()
      .then(() => {
        expect(hasClass(element(tab1), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/#/tabset/tab1');
      });
  });

  it('should display badge with correct text', () => {
    const badgeText = '29';
    const badgesCount = 5;
    for (let i = 0; i < badgesCount; i++) {
      const badgeEl = element(by.css(`nb-tabset:nth-child(6) > ul > li:nth-child(${i + 1}) > nb-badge > span`));
      expect(badgeEl.getText()).toEqual(badgeText);
    }
  });

  it('should display badge with correct status', () => {
    const badgesStatuses = [
      Badge.STATUS_PRIMARY,
      Badge.STATUS_INFO,
      Badge.STATUS_SUCCESS,
      Badge.STATUS_DANGER,
      Badge.STATUS_WARNING,
    ];
    for (let i = 0; i < badgesStatuses.length; i++) {
      const badgeEl = element(by.css(`nb-tabset:nth-child(6) > ul > li:nth-child(${i + 1}) > nb-badge > span`));
      expect(badgeEl.getAttribute('class')).toContain(badgesStatuses[i]);
    }
  });

  it('should display badge in correct position', () => {
    const badgesPositions = [
      Badge.TOP_RIGHT,
      Badge.TOP_LEFT,
      Badge.BOTTOM_RIGHT,
      Badge.BOTTOM_LEFT,
      Badge.BOTTOM_RIGHT,
    ];
    for (let i = 0; i < badgesPositions.length; i++) {
      const badgeEl = element(by.css(`nb-tabset:nth-child(6) > ul > li:nth-child(${i + 1}) > nb-badge > span`));
      expect(badgeEl.getAttribute('class')).toContain(badgesPositions[i]);
    }
  });
});
