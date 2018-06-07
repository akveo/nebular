/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';
import { colors, alertSizes as sizes } from './component-shared';
import { waitFor } from './e2e-helper';

let alerts: any[] = [];

function prepareAlerts() {
  const result: any[] = [];

  let elementNumber: number = 1;
  for (const { colorKey, color } of colors) {
    for (const { sizeKey, height } of sizes) {
      result.push({
        size: sizeKey,
        height: height,
        colorKey,
        color,
        elementNumber,
      });
      elementNumber++;
    }
  }

  return result;
}

function prepareAccentAlerts(regularCardsOffset) {
  function generateAccentAlerts(accentCardsOffset, colorKey, color) {
    return colors.map((c, i) => ({
      name: colorKey,
      colorKey,
      color,
      accentColor: c.color,
      accentKey: c.colorKey,
      elementNumber: regularCardsOffset + accentCardsOffset + i,
    }));
  }

  return colors.reduce((accentCards, { colorKey, color }) => {
    return accentCards.concat(generateAccentAlerts(accentCards.length, colorKey, color));
  }, []);
}

describe('nb-alert', () => {

  alerts = prepareAlerts();

  beforeEach((done) => {
    browser.get('#/alert/alert-test.component').then(() => done());
  });

  alerts.forEach(c => {

    it(`should display ${c.colorKey} alert with ${c.size} size`, () => {
      waitFor(`nb-alert:nth-child(${c.elementNumber})`);
      expect(element(by.css(`nb-alert:nth-child(${c.elementNumber})`))
        .getText()).toContain('Success message!');

      element(by.css(`nb-alert:nth-child(${c.elementNumber})`)).getCssValue('height').then(height => {
        expect(height).toEqual(c.height);
      });

      element(by.css(`nb-alert:nth-child(${c.elementNumber})`))
        .getCssValue('background-color').then(bgColor => {
          expect(bgColor).toEqual(c.color);
        });
    });
  });

  const accentAlerts = prepareAccentAlerts(alerts.length);
  accentAlerts.forEach(c => {
    it(`should display ${c.colorKey} alert with ${c.accentKey} accent`, () => {
      element.all(by.css(`nb-alert`))
        .get(c.elementNumber)
        .getCssValue('border-top-color').then(borderColor => {
          expect(borderColor).toEqual(c.accentColor, 'Accent is not correct');
        });
    });
  });

  it('should react on close click', () => {
    const all: any = element.all(by.css('nb-alert'));
    all.count().then(allCount => {
      element(by.css('nb-alert:nth-child(1) > .close')).click();
      expect(all.count()).toEqual(allCount - 1);
    });
  });
});
