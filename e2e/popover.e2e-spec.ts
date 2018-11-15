import { browser, by, element } from 'protractor';

const contentTemplate = by.css('nb-card:nth-child(1) button:nth-child(1)');
const popover = by.css('nb-layout nb-popover');

describe('nb-popover', () => {

  beforeEach((done) => {
    browser.get('#/popover/popover-test.component').then(done);
  });

  it('render template ref', () => {
    element(contentTemplate).click();
    const containerContent = element(popover).element(by.css('nb-card'));
    expect(containerContent.isPresent()).toBeTruthy();
  });
});
