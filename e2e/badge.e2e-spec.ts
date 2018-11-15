/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { element, by } from 'protractor';
import { waitFor } from './e2e-helper';

export default function badgeTests (badgesConfig) {
  const { selector, badges } = badgesConfig;

  it('should display badge with correct text', () => {
    for (let i = 0; i < badges.length; i++) {
      waitFor(selector(i));
      const badgeEl = element(by.css(selector(i)));
      expect(badgeEl.getText()).toEqual(badges[i].text);
    }
  });
}
