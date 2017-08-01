/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-sidebar', () => {

  beforeEach(() => {
    browser.get('#/sidebar');
  });

  it('should render sidebar hidden', () => {
    element.all(by.css('nb-sidebar[state="collapsed"]')).get(0).getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(0);
    });
  });

  it('should render sidebar compacted', () => {
    element.all(by.css('nb-sidebar[state="compacted"]')).get(0).getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(56);
    });
  });

  it('should open/close sidebar', () => {

    const button = element(by.css('#collapse-left'));
    const sidebar = element(by.css('nb-sidebar[fixed]'));

    button.click().then(() => {
      return browser.driver.wait(() => {
        return sidebar.getSize().then(sidebarSize => {
          return sidebarSize.width === 256;
        });
      }, 10000);
    });

    sidebar.getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(256);
    });

    button.click().then(() => {
      return browser.driver.wait(() => {
        return sidebar.getSize().then(sidebarSize => {
          return sidebarSize.width === 0;
        });
      }, 10000);
    });

    sidebar.getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(0);
    });
  });

  it('should open/compact sidebar', () => {

    const button = element(by.css('#collapse-right'));
    const sidebar = element(by.css('nb-sidebar[right]'));

    button.click().then(() => {
      return browser.driver.wait(() => {
        return sidebar.getSize().then(sidebarSize => {
          return sidebarSize.width === 256;
        });
      }, 10000);
    });

    sidebar.getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(256);
    });

    button.click().then(() => {
      return browser.driver.wait(() => {
        return sidebar.getSize().then(sidebarSize => {
          return sidebarSize.width === 56;
        });
      }, 10000);
    });

    sidebar.getSize().then(sidebarSize => {
      expect(sidebarSize.width).toEqual(56);
    });
  });

});
