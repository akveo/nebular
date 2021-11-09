import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  it('should render', (done: DoneFn) => {
    browser.get('/').then(() => {
      expect(element(by.css('bs-root')).getText()).toContain('Nebular Works!!!');
      done();
    });
  });
});
