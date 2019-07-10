import { browser, by, element, ElementArrayFinder } from 'protractor';

describe('nb-select', () => {

  beforeEach((done) => {
    browser.get('#/select/select-test.component').then(done);
  });

  it('should not shrink when has no placeholder and text', (done) => {
    const checks: Promise<void>[] = [];
    const selectHeights = [ 24, 32, 40, 48, 56 ];
    const selectElements: ElementArrayFinder = element.all(by.tagName('nb-select'));

    for (let i = 0; i < selectElements.length; i++) {
      const check = Promise.all([selectElements[i].getText(), selectElements[i].getSize()])
        .then(([text, { height }]) => {
          expect(text).toEqual('');
          expect(height).toEqual(selectHeights[i]);
        });

      checks.push(check);
    }

    Promise.all(checks).then(done);
  });
});
