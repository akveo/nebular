/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser } from 'protractor';
import { NbBadgeComponent } from '../src/framework/theme/components/badge/badge.component';
import badgeTests from './badge.e2e-spec';

describe('nb-user', () => {

  beforeEach((done) => {
    browser.get('#/user').then(() => done());
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
        { position: NbBadgeComponent.TOP_RIGHT, status: NbBadgeComponent.STATUS_PRIMARY, text: badgeText },
        { position: NbBadgeComponent.TOP_LEFT, status: NbBadgeComponent.STATUS_INFO, text: badgeText },
        { position: NbBadgeComponent.BOTTOM_RIGHT, status: NbBadgeComponent.STATUS_SUCCESS, text: badgeText },
        { position: NbBadgeComponent.BOTTOM_LEFT, status: NbBadgeComponent.STATUS_WARNING, text: badgeText },
        { position: NbBadgeComponent.TOP_LEFT, status: NbBadgeComponent.STATUS_DANGER, text: badgeText },
      ],
    };
    badgeTests(badgesConf);
  });

});
