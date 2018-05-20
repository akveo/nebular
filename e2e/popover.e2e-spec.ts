import { browser, by, element } from 'protractor';

const routes = {
  showcase: '#/popover-showcase/popover-showcase.component',
  templateRef: '#/popover-template-ref/popover-template-ref.component',
  customComponent: '#/popover-custom-component/popover-custom-component.component',
  placements: '#/popover-placements/popover-placements.component',
  modes: '#/popover-modes/popover-modes.component',
};

const popover = by.css('nb-popover');
const button = by.css('button');

describe('nb-popover', () => {

  it('render template ref', done => {
    browser.get(routes.templateRef)
      .then(() => {
        element(button).click();
        expect(element(popover).isPresent()).toBeTruthy();
      })
      .then(done);
  });

  it('render component ref', done => {
    browser.get(routes.customComponent)
      .then(() => {
        element(button).click();
        expect(element(popover).isPresent()).toBeTruthy();
      })
      .then(done);
  });

  it('render container with arrow', done => {
    browser.get(routes.showcase)
      .then(() => {
        element(button).click();
        const arrow = element(popover).element(by.css('span'));
        expect(arrow.getAttribute('class')).toEqual('arrow');
      })
      .then(done);
  });

  it('render container in the right', done => {
    browser.get(routes.placements)
      .then(() => {
        element(by.css('button:nth-child(1)')).click();
        expect(element(popover).isPresent()).toBeTruthy();
        expect(element(popover).getAttribute('class')).toEqual('right');
      })
      .then(done);
  });

  it('render container in the bottom', done => {
    browser.get(routes.placements)
      .then(() => {
        element(by.css('button:nth-child(2)')).click();
        expect(element(popover).isPresent()).toBeTruthy();
        expect(element(popover).getAttribute('class')).toEqual('bottom');
      })
      .then(done);
  });

  it('render container in the top', done => {
    browser.get(routes.placements)
      .then(() => {
        element(by.css('button:nth-child(3)')).click();
        expect(element(popover).isPresent()).toBeTruthy();
        expect(element(popover).getAttribute('class')).toEqual('top');
      })
      .then(done);
  });

  it('render container in the left', done => {
    browser.get(routes.placements)
      .then(() => {
        element(by.css('button:nth-child(4)')).click();
        expect(element(popover).isPresent()).toBeTruthy();
        expect(element(popover).getAttribute('class')).toEqual('left');
      })
      .then(done);
  });

  it('have to render component with context', done => {
    browser.get(routes.customComponent)
      .then(() => {
        element(button).click();
        const text = element(popover).element(by.css('nb-dynamic-to-add > div > strong')).getText();
        expect(text).toEqual('hello from dynamically inserted component: Example context');
      })
      .then(done);
  });

  it('have to render template with context', done => {
    browser.get(routes.templateRef)
      .then(() => {
        element(button).click();
        const text = element(popover).element(by.css('nb-card-body > span')).getText();
        expect(text).toEqual('Template Ref with context: Example context');
      })
      .then(done);
  });

  describe('click mode', () => {
    const button = by.css('button:nth-child(1)');

    it('open popover by host click', done => {
      browser.get(routes.modes)
        .then(() => {
          element(button).click();
          expect(element(popover).isPresent()).toBeTruthy();
        })
        .then(done);
    });

    it('close popover by host click', done => {
      browser.get(routes.modes)
        .then(() => {
          element(button).click();
          expect(element(popover).isPresent()).toBeTruthy();
          element(button).click();
          expect(element(popover).isPresent()).toBeFalsy();
        })
        .then(done);
    });

    it('doesn\'t close popover by container click', done => {
      browser.get(routes.modes)
        .then(() => {
          element(button).click();
          expect(element(popover).isPresent()).toBeTruthy();
          element(popover).click();
          expect(element(popover).isPresent()).toBeTruthy();
        })
        .then(done);
    });

    it('close popover by click outside the host and container', done => {
      browser.get(routes.modes)
        .then(() => {
          element(button).click();
          expect(element(popover).isPresent()).toBeTruthy();
          browser.actions()
            .mouseMove(element(popover), { x: -10, y: -10 })
            .click()
            .perform();
          expect(element(popover).isPresent()).toBeFalsy();
        })
        .then(done);
    });
  });

  describe('hover mode', () => {
    const button = by.css('button:nth-child(3)');

    it('open popover by hover on host', done => {
      browser.get(routes.modes)
        .then(() => {
          browser.actions()
            .mouseMove(element(button))
            .perform();

          expect(element(popover).isPresent()).toBeTruthy();
        })
        .then(done);
    });

    it('close popover by hover out host', done => {
      browser.get(routes.modes)
        .then(() => {
          browser.actions()
            .mouseMove(element(button))
            .perform();

          expect(element(popover).isPresent()).toBeTruthy();

          browser.actions()
            .mouseMove(element(by.css('button:nth-child(1)')))
            .perform();

          expect(element(popover).isPresent()).toBeFalsy();
        })
        .then(done);
    });

    it('doesn\'t close popover by hover on container', done => {
      browser.get(routes.modes)
        .then(() => {
          browser.actions()
            .mouseMove(element(button))
            .perform();

          expect(element(popover).isPresent()).toBeTruthy();

          browser.actions()
            .mouseMove(element(popover))
            .perform();

          expect(element(popover).isPresent()).toBeTruthy();
        })
        .then(done);
    });
  });

  describe('hint mode', () => {
    const button = by.css('button:nth-child(2)');

    it('open popover by hover on host with hint', done => {
      browser.get(routes.modes)
        .then(() => {
          browser.actions()
            .mouseMove(element(button))
            .perform();

          expect(element(popover).isPresent()).toBeTruthy();
        })
        .then(done);
    });
  });

  it('have to hide popover when host removed', done => {
    element(contentTemplate).click();
    expect(element(popover).isPresent()).toBeTruthy();
    browser.get('#/').then(() => {
      expect(element(popover).isPresent()).toBeFalsy();
      done();
    })
  });
});
