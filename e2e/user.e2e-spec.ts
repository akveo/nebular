/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import Badge from '../src/framework/theme/components/badge/badge.component';

describe('nb-user', () => {

  beforeEach(() => {
    browser.get('#/user');
  });

  // fit('should render main-container', () => {
  //   element(by.css('nb-user:nth-child(0) > .user-container > .background')).getText().then(value => {
  //     expect(value).toMatch('D N');
  //   });
  // });

  it('should display badge with correct status and position', () => {
    const elementsOffset = 10;
    const badgeText = '29';
    const badges = [
      { position: Badge.TOP_RIGHT, status: Badge.STATUS_PRIMARY, badgeText },
      { position: Badge.TOP_LEFT, status: Badge.STATUS_INFO, badgeText },
      { position: Badge.BOTTOM_RIGHT, status: Badge.STATUS_SUCCESS, badgeText },
      { position: Badge.BOTTOM_LEFT, status: Badge.STATUS_WARNING, badgeText },
      { position: Badge.TOP_LEFT, status: Badge.STATUS_DANGER, badgeText },
    ];
    for (let i = 0; i < badges.length; i++) {
      const badgeEl = element(by.css(`.test-row:nth-child(${elementsOffset + i + 1}) nb-badge > span`));
      expect(badgeEl.getText()).toEqual(badges[i].badgeText);
      expect(badgeEl.getAttribute('class')).toContain(badges[i].position);
      expect(badgeEl.getAttribute('class')).toContain(badges[i].status);
    }
  });

});
