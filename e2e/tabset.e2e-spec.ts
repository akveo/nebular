/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { hasClass } from './e2e-helper';
import { NbBadgeComponent } from '../src/framework/theme/components/badge/badge.component';
import badgeTests from './badge.e2e-spec';

describe('nb-tabset', () => {
  beforeEach((done) => {
    browser.get('#/tabset').then(() => done());
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

  it('should lazy load tab content', () => {
    expect(element(by.css('nb-tabset:nth-child(8) > nb-tab[tabTitle="Tab #1"] > span'))
      .getText()).toEqual('Content #1');

    expect(element(by.css('nb-tabset:nth-child(8) > nb-tab[tabTitle="Tab #2"]'))
      .getText()).toEqual('');

    const tab3 = element(by.css('nb-tabset:nth-child(8) > nb-tab[tabTitle="Tab #3"] > span'));
    const tab3Text = 'Content #3';
    expect(browser.executeScript('return arguments[0].innerHTML;', tab3)).toEqual(tab3Text);

    const tab4 = element(by.css('nb-tabset:nth-child(8) > nb-tab[tabTitle="Tab #4"] > span'));
    const tab4Text = 'Content #4';
    expect(browser.executeScript('return arguments[0].innerHTML;', tab4)).toEqual(tab4Text);
  });

  describe('badge', () => {
    const badgeText = '29';
    const badgesConf = {
      selector: (i) => `nb-tabset:nth-child(6) > ul > li:nth-child(${i + 1}) > nb-badge > span`,
      badges: [
        { text: badgeText, status: NbBadgeComponent.STATUS_PRIMARY, position: NbBadgeComponent.TOP_RIGHT },
        { text: badgeText, status: NbBadgeComponent.STATUS_INFO, position: NbBadgeComponent.TOP_LEFT },
        { text: badgeText, status: NbBadgeComponent.STATUS_SUCCESS, position: NbBadgeComponent.BOTTOM_RIGHT },
        { text: badgeText, status: NbBadgeComponent.STATUS_DANGER, position: NbBadgeComponent.BOTTOM_LEFT },
        { text: badgeText, status: NbBadgeComponent.STATUS_WARNING, position: NbBadgeComponent.BOTTOM_RIGHT },
      ],
    };
    badgeTests(badgesConf);
  })
});
