import { browser, by, element } from 'protractor';

const contentTemplate = by.css('nb-card:nth-child(1) button:nth-child(1)');
const contentComponentWithContext = by.css('nb-card:nth-child(1) button:nth-child(2)');
const contentTemplateWithContext = by.css('nb-card:nth-child(1) button:nth-child(3)');
const contentString = by.css('nb-card:nth-child(1) button:nth-child(4)');
const placementRight = by.css('nb-card:nth-child(2) button:nth-child(1)');
const placementBottom = by.css('nb-card:nth-child(2) button:nth-child(2)');
const placementTop = by.css('nb-card:nth-child(2) button:nth-child(3)');
const placementLeft = by.css('nb-card:nth-child(2) button:nth-child(4)');
const modeClick = by.css('nb-card:nth-child(4) button:nth-child(1)');
const modeHover = by.css('nb-card:nth-child(4) button:nth-child(2)');
const modeHint = by.css('nb-card:nth-child(4) button:nth-child(3)');
const popover = by.css('nb-layout > nb-popover');

describe('nb-popover', () => {

  beforeEach((done) => {
    browser.get('#/popover').then(done);
  });

  it('render template ref', () => {
    element(contentTemplate).click();
    const containerContent = element(popover).element(by.css('nb-card'));
    expect(containerContent.isPresent()).toBeTruthy();
  });

  it('render component ref', () => {
    element(contentComponentWithContext).click();
    const containerContent = element(popover).element(by.css('nb-dynamic-to-add'));
    expect(containerContent.isPresent()).toBeTruthy();
  });

  it('render primitive', () => {
    element(contentString).click();
    const containerContent = element(popover).element(by.css('div'));
    expect(containerContent.isPresent()).toBeTruthy();
    expect(containerContent.getAttribute('class')).toEqual('primitive-popover');
    expect(containerContent.getText()).toEqual('Hi, I\'m popover!');
  });

  it('render container with arrow', () => {
    element(contentTemplate).click();
    const arrow = element(popover).element(by.css('span'));
    expect(arrow.getAttribute('class')).toEqual('arrow');
  });

  it('render container in the right', () => {
    element(placementRight).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    expect(container.getAttribute('class')).toEqual('right');
  });

  it('render container in the bottom', () => {
    element(placementBottom).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    expect(container.getAttribute('class')).toEqual('bottom');
  });

  it('render container in the top', () => {
    element(placementTop).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    expect(container.getAttribute('class')).toEqual('top');
  });

  it('render container in the left', () => {
    element(placementLeft).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    expect(container.getAttribute('class')).toEqual('left');
  });

  it('open popover by host click', () => {
    element(modeClick).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
  });

  it('close popover by host click', () => {
    element(modeClick).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    element(modeClick).click();
    expect(container.isPresent()).toBeFalsy();
  });

  it('doesn\'t close popover by container click', () => {
    element(modeClick).click();
    const container = element(popover);
    container.click();
    expect(container.isPresent()).toBeTruthy();
  });

  it('close popover by click outside the host and container', () => {
    element(modeClick).click();
    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
    browser.actions()
      .mouseMove(container, { x: -10, y: -10 })
      .click()
      .perform();
    expect(container.isPresent()).toBeFalsy();
  });

  it('open popover by hover on host', () => {
    browser.actions()
      .mouseMove(element(modeHover))
      .perform();

    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
  });

  it('close popover by hover out host', () => {
    browser.actions()
      .mouseMove(element(modeHover))
      .perform();

    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();

    browser.actions()
      .mouseMove(element(modeClick))
      .perform();

    expect(container.isPresent()).toBeFalsy();
  });

  it('doesn\'t close popover by hover on container', () => {
    browser.actions()
      .mouseMove(element(modeHover))
      .perform();

    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();

    browser.actions()
      .mouseMove(container)
      .perform();

    expect(container.isPresent()).toBeTruthy();
  });

  it('open popover by hover on host with hint', () => {
    browser.actions()
      .mouseMove(element(modeHint))
      .perform();

    const container = element(popover);
    expect(container.isPresent()).toBeTruthy();
  });

  it('have to render component with context', () => {
    element(contentComponentWithContext).click();
    const text = element(popover).element(by.css('nb-dynamic-to-add > div > strong')).getText();
    expect(text).toEqual('hello from dynamically inserted component: Example context');
  });

  it('have to render template with context', () => {
    element(contentTemplateWithContext).click();
    const text = element(popover).element(by.css('nb-dynamic-to-add > div > strong')).getText();
    expect(text).toEqual('hello from dynamically inserted component: Example context');
  });
});
