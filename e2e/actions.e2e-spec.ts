/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import Badge from '../src/framework/theme/components/badge/badge.component';
import badgeTests from './badge.e2e-spec';

describe('nb-action', () => {

  beforeEach(() => {
    browser.get('#/actions');
  });

  describe('badge', () => {
    const badgeText = '29';
    const badgesConf = {
      selector: (i) => `nb-card:nth-child(4) nb-actions nb-action:nth-child(${i + 1}) nb-badge > span`,
      badges: [
        { position: Badge.BOTTOM_LEFT, status: Badge.STATUS_SUCCESS, text: badgeText },
        { position: Badge.TOP_LEFT, status: Badge.STATUS_DANGER, text: badgeText },
        { position: Badge.BOTTOM_RIGHT, status: Badge.STATUS_WARNING, text: badgeText },
        { position: Badge.BOTTOM_LEFT, status: Badge.STATUS_SUCCESS, text: badgeText },
        { position: Badge.TOP_RIGHT, status: Badge.STATUS_INFO, text: badgeText },
        { position: Badge.TOP_RIGHT, status: Badge.STATUS_INFO, text: badgeText },
        { position: Badge.TOP_RIGHT, status: Badge.STATUS_PRIMARY, text: badgeText },
      ],
    };
    badgeTests(badgesConf);
  });

});
