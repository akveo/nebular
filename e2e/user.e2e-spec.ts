/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { BadgeComponent } from '../src/framework/theme/components/badge/badge.component';
import badgeTests from './badge.e2e-spec';

describe('nb-user', () => {

  beforeEach(() => {
    browser.get('#/user');
  });

  // fit('should render main-container', () => {
  //   element(by.css('nb-user:nth-child(0) > .user-container > .background')).getText().then(value => {
  //     expect(value).toMatch('D N');
  //   });
  // });

  describe('badge', () => {
    const elementsOffset = 10;
    const badgeText = '29';
    const badgesConf = {
      selector: (i) => `.test-row:nth-child(${elementsOffset + i + 1}) nb-badge > span`,
      badges: [
        { position: BadgeComponent.TOP_RIGHT, status: BadgeComponent.STATUS_PRIMARY, text: badgeText },
        { position: BadgeComponent.TOP_LEFT, status: BadgeComponent.STATUS_INFO, text: badgeText },
        { position: BadgeComponent.BOTTOM_RIGHT, status: BadgeComponent.STATUS_SUCCESS, text: badgeText },
        { position: BadgeComponent.BOTTOM_LEFT, status: BadgeComponent.STATUS_WARNING, text: badgeText },
        { position: BadgeComponent.TOP_LEFT, status: BadgeComponent.STATUS_DANGER, text: badgeText },
      ],
    };
    badgeTests(badgesConf);
  });

});
