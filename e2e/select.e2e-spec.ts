import { browser, by, element } from 'protractor';

describe('nb-select', () => {

  beforeEach((done) => {
    browser.get('#/select/select-test.component').then(done);
  });

  it('should not shrink when has no placeholder and text', (done) => {
    const selectHeights = [ 24, 32, 40, 48, 56 ];

    element.all(by.tagName('nb-select')).then((selectElements: HTMLElement[]) => {
      for (let i = 0; i < selectElements.length; i++) {
        expect(selectElements[i].textContent).toEqual('');
        expect(selectElements[i].offsetHeight).toEqual(selectHeights[i]);
      }

      done();
    });
  });
});
