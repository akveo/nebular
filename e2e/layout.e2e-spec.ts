/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-layout', () => {
  beforeEach(() => {
    browser.get('#/layout');
  });

  it('should render container', () => {
    element(by.css('#layout-fluid > div')).getAttribute('class').then(value => {
      expect(value).toMatch('scrollable-container');
    });
  });

  it('should have correct font-family', () => {
    element(by.css('#layout-fluid > .scrollable-container > .layout')).getCssValue('font-family').then(value => {
      expect(value).toMatch('"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif');
    });
  });

  const columns = 3;
  it(`should have ${columns} nb-layout-columns`, () => {
    expect(
      element(by.css('#layout-fluid > .scrollable-container > .layout > .layout-container > .content > .columns'))
        .all(by.css('nb-layout-column'))
        .count(),
    ).toEqual(columns);
  });

  it('should render left with flex: 1 0', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(0)
      .getCssValue('flex')
      .then(value => {
        expect(value).toMatch('1 0');
      });
  });

  it('should render left with order: 1', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(0)
      .getCssValue('order')
      .then(value => {
        expect(value).toMatch('1');
      });
  });

  it('should render center with flex: 1 0 auto', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(1)
      .getCssValue('flex')
      .then(value => {
        expect(value).toMatch('1 0 0%');
      });
  });

  it('should render center with order: 2', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(1)
      .getCssValue('order')
      .then(value => {
        expect(value).toMatch('2');
      });
  });

  it('should render right with flex: 1 0 auto', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(2)
      .getCssValue('flex')
      .then(value => {
        expect(value).toMatch('1 0 0%');
      });
  });

  it('should render right with order: 2', () => {
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(2)
      .getCssValue('order')
      .then(value => {
        expect(value).toMatch('2');
      });
  });

  it('should render container centered', () => {
    element(by.css('#layout-center > .scrollable-container > .layout > .layout-container > .content'))
      .getAttribute('class')
      .then(value => {
        expect(value).toMatch('content center');
      });
  });

  it('should prevent column expansion if child content is too long in fixed layout', () => {

    const content =  element(by.css('#layout-center > .scrollable-container > .layout > .layout-container > .content'));
    element
      .all(
        by.css(`#layout-center >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(2)
      .getSize()
      .then(size => {

        content.getSize().then(contentSize => {
          // one third of the content widht (as we have 3 columns)
          expect(size.width).toEqual(Math.ceil(contentSize.width / 3));
        })
      });
  });

  it('should prevent column expansion if child content is too long in fluid layout', () => {

    const content =  element(by.css('#layout-fluid > .scrollable-container > .layout > .layout-container > .content'));
    element
      .all(
        by.css(`#layout-fluid >
     .scrollable-container > .layout > .layout-container > .content > .columns > nb-layout-column`),
      )
      .get(2)
      .getSize()
      .then(size => {

        content.getSize().then(contentSize => {
          // one third of the content widht (as we have 3 columns)
          expect(size.width).toEqual(Math.ceil(contentSize.width / 3));
        })
      });
  });
});
