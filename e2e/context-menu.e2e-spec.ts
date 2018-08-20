import { browser, by, element } from 'protractor';

const withContextMenu = by.css('nb-card:nth-child(1) nb-user:nth-child(1)');
const popover = by.css('nb-layout > nb-arrowed-overlay-container');

describe('nb-context-menu', () => {

  beforeEach((done) => {
    browser.get('#/context-menu/context-menu-test.component').then(done);
  });

  it('have to hide when click on item', () => {
    element(withContextMenu).click();
    const containerContent = element(popover).all(by.css('nb-menu > ul > li')).get(2);
    expect(containerContent.isPresent()).toBeTruthy();

    containerContent.click();
    expect(containerContent.isPresent()).toBeFalsy();
  });

  it('have to be opened by click', () => {
    element(withContextMenu).click();
    const containerContent = element(popover).element(by.css('nb-menu > ul'));

    expect(containerContent.isPresent()).toBeTruthy();
  });

  it('should have three menu items', () => {
    element(withContextMenu).click();
    const menuItems = element(popover).all(by.css('nb-menu > ul > li'));

    expect(menuItems.count()).toEqual(3);
  });

  it('have to open user page after click on first item', () => {
    element(withContextMenu).click();
    const menuItems = element(popover).all(by.css('nb-menu > ul > li'));
    menuItems.get(0).click();

    expect(browser.getCurrentUrl().then(it => it.split('#/')[1])).toEqual('user');
  });

  it('have to open popover page after click on second item', () => {
    element(withContextMenu).click();
    const menuItems = element(popover).all(by.css('nb-menu > ul > li'));
    menuItems.get(1).click();

    expect(browser.getCurrentUrl().then(it => it.split('#/')[1])).toEqual('popover');
  });
});
