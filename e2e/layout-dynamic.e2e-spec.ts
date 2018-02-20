/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout theme', () => {

  beforeEach((done) => {
    browser.get('#/layout/dynamic').then(() => done());
  });

  it('shown have layout first', () => {
    element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
      expect(value).toMatch('div');
    });
  });

  it('should append into nb-layout', () => {

    const button = element(by.css('#add-dynamic'));

    button.click().then(() => {
      return browser.driver.wait(() => {
        return element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
          return value === 'nb-dynamic-to-add';
        });
      }, 10000);
    });

    element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
      expect(value).toMatch('nb-dynamic-to-add');
    });
    element(by.css('nb-layout')).$$('*').get(1).getTagName().then(value => {
      expect(value).toMatch('div');
    });
  });

  it('should append by factory into nb-layout', () => {

    const button = element(by.css('#add-dynamic-by-factory'));

    button.click().then(() => {
      return browser.driver.wait(() => {
        return element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
          return value === 'nb-dynamic-to-add';
        });
      }, 10000);
    });

    element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
      expect(value).toMatch('nb-dynamic-to-add');
    });
    element(by.css('nb-layout')).$$('*').get(1).getTagName().then(value => {
      expect(value).toMatch('div');
    });
  });

  it('should clear dymamic nb-layout area', () => {

    const buttonAdd = element(by.css('#add-dynamic'));
    const buttonClear = element(by.css('#clear-dynamic'));

    buttonAdd.click().then(() => {
      return browser.driver.wait(() => {
        return element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
          return value === 'nb-dynamic-to-add';
        });
      }, 10000);
    });
    element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
      expect(value).toMatch('nb-dynamic-to-add');
    });

    buttonClear.click().then(() => {
      return browser.driver.wait(() => {
        return element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
          return value === 'div';
        });
      }, 10000);
    });

    element(by.css('nb-layout')).$$('*').first().getTagName().then(value => {
      expect(value).toMatch('div');
    });
  });

});
