/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser } from 'protractor';
import { NbBadgeComponent } from '../src/framework/theme/components/badge/badge.component';
import badgeTests from './badge.e2e-spec';

describe('nb-action', () => {

  beforeAll(() => {
    browser.get('#/action/action-test.component');
  });

  describe('badge', () => {
    const badgeText = '29';
    const badgesConf = {
      selector: (i) => `nb-card:nth-child(4) nb-actions nb-action:nth-child(${i + 1}) nb-badge > span`,
      badges: [
        { position: NbBadgeComponent.BOTTOM_LEFT, status: NbBadgeComponent.STATUS_SUCCESS, text: badgeText },
      ],
    };
    badgeTests(badgesConf);
  });

});
