/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by, ExpectedConditions as ec } from 'protractor';

import { hasClass } from './e2e-helper';

const group = by.css('nb-menu ul li:nth-child(1) span');
const menu1 = by.css('nb-menu ul li:nth-child(2) a');
const menu2 = by.css('nb-menu ul li:nth-child(3) a');
const menu3 = by.css('nb-menu ul li:nth-child(4) a');
const menu3SubMenu = by.css('nb-menu ul li:nth-child(4) ul');
const menu31 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(1) a');
const menu32 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(2) a');
const menu33 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(3) a');
const menu33SubMenu = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(3) ul');
const menu331 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(3) ul li:nth-child(1) a');
const menu332 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(3) ul li:nth-child(2) a');
const menu333 = by.css('nb-menu ul li:nth-child(4) ul li:nth-child(3) ul li:nth-child(3) a');
const newMenu = by.css('nb-menu ul li:nth-child(5) a');
const addButton = by.css('#addBtn');
const homeButton = by.css('#homeBtn');

const waitTime = 10 * 1000;

describe('nb-menu', () => {

  beforeEach(() => {
    browser.get('#/menu');
  });

  it('should display group title', () => {
    element.all(group).first().getText()
      .then(val => {
        expect(val).toEqual('Menu Items');
      });
  });

  it('should display menu', () => {
    expect(element(by.css('nb-menu')).isDisplayed()).toBeTruthy();
    expect(browser.getCurrentUrl()).toContain('#/menu/1');
  });

  it('should be selected - Menu #1', () => {
    element.all(menu1).first().getText()
      .then(val => {
        expect(val).toEqual('Menu #1');
      });

    element.all(menu1).first().click()
      .then(() => {
        expect(hasClass(element.all(menu1).first(), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('#/menu/1');
      });
  });

  it('should be selected - Menu #2', () => {
    element.all(menu2).first().getText()
      .then(val => {
        expect(val).toEqual('Menu #2');
      });

    element.all(menu2).first().click()
      .then(() => {
        expect(hasClass(element.all(menu2).first(), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('#/menu/2');
      });
  });

  it('should be expanded - Menu #3', () => {
    expect(hasClass(element.all(menu3SubMenu).first(), 'collapsed')).toBeTruthy();

    element.all(menu3).first().getText()
      .then(val => {
        expect(val).toEqual('Menu #3');
      });

    element.all(menu3).first().click()
      .then(() => {
        expect(hasClass(element.all(menu3SubMenu).first(), 'expanded')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('#/menu/1');

        element.all(menu3).first().getText()
          .then(val => {
            expect(val).toEqual('Menu #3');
          });

        element.all(menu3).first().click()
          .then(() => {
            expect(hasClass(element.all(menu3SubMenu).first(), 'collapsed')).toBeTruthy();
            expect(browser.getCurrentUrl()).toContain('#/menu/1');
          });
      });
  });

  it('should be selected - Menu #3.1', () => {
    expect(hasClass(element.all(menu3SubMenu).first(), 'collapsed')).toBeTruthy();

    element.all(menu3).first().click()
      .then(() => {
        const menu31el = element.all(menu31).first();
        browser.wait(ec.elementToBeClickable(menu31el), waitTime);

        menu31el.getText()
          .then(val => {
            expect(val).toEqual('Menu #3.1');
          });

        menu31el.click()
          .then(() => {
            expect(browser.getCurrentUrl()).toContain('#/menu/3/1');
          });
      });
  });

  it('should be selected - Menu #3.2', () => {
    element.all(menu3).first().click()
      .then(() => {
        const menu32el = element.all(menu32).first();
        browser.wait(ec.elementToBeClickable(menu32el), waitTime);

        menu32el.getText()
          .then(val => {
            expect(val).toEqual('Menu #3.2');
          });

        menu32el.click()
          .then(() => {
            expect(browser.getCurrentUrl()).toContain('#/menu/3/2');
          });
      });
  });

  it('should be expanded - Menu #3.3', () => {
    element.all(menu3).first().click()
      .then(() => {
        const menu33el = element.all(menu33).first();
        browser.wait(ec.elementToBeClickable(menu33el), waitTime);

        menu33el.getText()
          .then(val => {
            expect(val).toEqual('Menu #3.3');
          });

        menu33el.click()
          .then(() => {
            expect(hasClass(element.all(menu33SubMenu).first(), 'expanded')).toBeTruthy();
            expect(browser.getCurrentUrl()).toContain('#/menu/1');

            menu33el.click()
              .then(() => {
                expect(hasClass(element.all(menu33SubMenu).first(), 'collapsed')).toBeTruthy();
                expect(browser.getCurrentUrl()).toContain('#/menu/1');
              });
          });
      });
  });

  it('should be selected - Menu #3.3.1', () => {
    element.all(menu3).first().click()
      .then(() => {
        const menu33el = element.all(menu33).first();
        browser.wait(ec.elementToBeClickable(menu33el), waitTime);

        menu33el.click()
          .then(() => {
            const menu331el = element.all(menu331).first();
            browser.wait(ec.elementToBeClickable(menu331el), waitTime);

            menu331el.getText()
              .then(val => {
                expect(val).toEqual('Menu #3.3.1');
              });

            menu331el.click()
              .then(() => {
                expect(hasClass(menu331el, 'active')).toBeTruthy();
                expect(browser.getCurrentUrl()).toContain('#/menu/3/3/1');
              });
          });
      });
  });

  it('should be selected - Menu #3.3.2', () => {
    element.all(menu3).first().click()
      .then(() => {
        const menu33el = element.all(menu33).first();
        browser.wait(ec.elementToBeClickable(menu33el), waitTime);

        menu33el.click()
          .then(() => {
            const menu332el = element.all(menu332).first();
            browser.wait(ec.elementToBeClickable(menu332el), waitTime);

            menu332el.getText()
              .then(val => {
                expect(val).toEqual('Menu #3.3.2');
              });

            menu332el.click()
              .then(() => {
                expect(hasClass(menu332el, 'active')).toBeTruthy();
                expect(browser.getCurrentUrl()).toContain('#/menu/3/3/2');
              });
          });
      });
  });

  it('should be selected - Menu #3.3.3', () => {
    element.all(menu3).first().click()
      .then(() => {
        const menu33el = element.all(menu33).first();
        browser.wait(ec.elementToBeClickable(menu33el), waitTime);

        menu33el.click()
          .then(() => {
            const menu333el = element.all(menu333).first();
            browser.wait(ec.elementToBeClickable(menu333el), waitTime);

            menu333el.getText()
              .then(val => {
                expect(val).toEqual('@nebular/theme');
              });

            menu333el.click()
              .then(() => {
                expect(hasClass(menu333el, 'active')).toBeTruthy();
                expect(browser.getCurrentUrl()).toContain('#/menu/1');
              });
          });
      });
  });

  it('should be selected - Menu #3.2.2 (navigate home)', () => {
    element(homeButton).click()
      .then(() => {
        expect(hasClass(element.all(menu332).first(), 'active')).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('#/menu/3/3/2');
      });
  });

  it('should add new menu item', () => {
    element(addButton).click()
      .then(() => {
        element.all(newMenu).first().getText()
          .then(val => {
            expect(val).toEqual('New Menu Item');
          });

        expect(browser.getCurrentUrl()).toContain('#/menu/1');
      });
  });
});
