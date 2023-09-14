import { browser, by, element } from 'protractor';

const withContextMenu = by.css('nb-card:nth-child(1) nb-user:nth-child(1)');
const popover = by.css('nb-layout nb-context-menu');

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
});
