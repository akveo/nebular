/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import badgeTests from './badge.e2e-spec';

describe('nb-user', () => {

  beforeEach((done) => {
    browser.get('#/user/user-test.component').then(() => done());
  });

  describe('badge', () => {
    const elementsOffset = 10;
    const badgeText = '29';
    const badgesConf = {
      selector: (i) => `.test-row:nth-child(${elementsOffset + i + 1}) nb-badge`,
      badges: [
        { position: 'top right', status: 'primary', text: badgeText },
      ],
    };
    badgeTests(badgesConf);
  });

  it('background image should have base64 image', () => {
    element(by.css('#base64-image .user-picture.image')).getCssValue('background-image').then(value => {
      expect(value).toEqual('url("data:image/png;base64,aaa")');
    });
  });

});
