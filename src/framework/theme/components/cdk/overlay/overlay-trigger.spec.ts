import { DOCUMENT } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { NbTrigger, NbTriggerStrategyBuilderService } from './overlay-trigger';
import { NB_DOCUMENT } from '../../../theme.options';
import createSpy = jasmine.createSpy;

// TODO: move into a separate file
const withContainer = el => () => ({ location: { nativeElement: el } }) as ComponentRef<any>;
const createElement = (name = 'div') => {
  const el = document.createElement(name);
  document.body.appendChild(el);
  return el;
};
const click = el => el.dispatchEvent(new Event('click', { bubbles: true }));
const mouseMove = el => el.dispatchEvent(new Event('mousemove'));
const mouseEnter = el => el.dispatchEvent(new Event('mouseenter'));
const mouseLeave = el => el.dispatchEvent(new Event('mouseleave'));
const focus = el => el.dispatchEvent(new Event('focusin', { bubbles: true }));
const blur = el => el.dispatchEvent(new Event('focusout', { bubbles: true }));
const tab = (el) => el.dispatchEvent(new KeyboardEvent('keydown', <any> {
  bubbles: true,
  keyCode: 9,
}));

describe('click-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;


  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        NbTriggerStrategyBuilderService,
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
      ],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder
      .trigger(NbTrigger.CLICK)
      .host(host)
      .container(withContainer(container));
  });

  it('should fire show$ when click on host without container', done => {
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();

    triggerStrategy.show$.subscribe(done);

    click(host);
  });

  it('should fire hide$ when click on host with container', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    click(host);
  });

  it('should fire hide$ when click on document', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    click(document);
  });

  it('should not fire hide$ when click on container', () => {
    const triggerStrategy = triggerStrategyBuilder.build();
    const spy = jasmine.createSpy();

    triggerStrategy.hide$.subscribe(spy);
    click(container);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not destroy when host reattached', () => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();

    triggerStrategy.show$.subscribe(showSpy);

    click(host);

    expect(showSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(host);
    document.body.appendChild(host);

    click(host);

    expect(showSpy).toHaveBeenCalledTimes(2);
  });
});

describe('hover-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        NbTriggerStrategyBuilderService,
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
      ],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder
      .trigger(NbTrigger.HOVER)
      .host(host)
      .container(withContainer(container));
  });

  it('should fire show$ when hover on host', done => {
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();
    triggerStrategy.show$.subscribe(done);
    mouseEnter(host);
  });

  it('should fire hide$ when hover out of host', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    mouseEnter(host);
    mouseLeave(host);
    mouseMove(document);
  });

  it('should not fire hide$ when hover out to container', () => {
    const triggerStrategy = triggerStrategyBuilder.build();
    const spy = jasmine.createSpy();
    triggerStrategy.hide$.subscribe(spy);

    mouseEnter(host);
    mouseLeave(host);
    mouseMove(container);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not destroy when host reattached', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();

    triggerStrategy.show$.subscribe(showSpy);

    mouseEnter(host);

    // hover trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(host);
    document.body.appendChild(host);

    mouseEnter(host);

    // hover trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(2);
  }));
});

describe('hint-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        NbTriggerStrategyBuilderService,
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
      ],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder
      .trigger(NbTrigger.HINT)
      .host(host)
      .container(withContainer(container));
  });

  it('should fire show$ when hover on host', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.show$.subscribe(done);
    mouseEnter(host);
  });

  it('should fire hide$ when hover out from host', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    mouseLeave(host);
  });

  it('should not destroy when host reattached', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder
      .build();

    triggerStrategy.show$.subscribe(showSpy);

    mouseEnter(host);

    // hint trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(host);
    document.body.appendChild(host);

    mouseEnter(host);

    // hint trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(2);
  }));
});

describe('focus-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        NbTriggerStrategyBuilderService,
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
      ],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder
      .trigger(NbTrigger.FOCUS)
      .host(host)
      .container(withContainer(container));
  });

  it('should fire show$ when focused into host', done => {
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();
    triggerStrategy.show$.subscribe(done);
    focus(host);
  });

  it('should fire show$ when clicked into host', done => {
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();
    triggerStrategy.show$.subscribe(done);
    click(host);
  });

  it('should fire hide$ when clicked on document', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    click(document);
  });

  it('should fire hide$ when tab pressed', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    tab(host);
  });

  it('should fire hide$ when focusout', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
    triggerStrategy.hide$.subscribe(done);
    blur(host);
    focus(document);
  });

  it('should fire show$ once when focused and clicked into host', fakeAsync(() => {
    const showSpy = createSpy('showSpy');
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();
    triggerStrategy.show$.subscribe(showSpy);
    focus(host);
    click(host);
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not destroy when host reattached', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();

    triggerStrategy.show$.subscribe(showSpy);

    focus(host);

    // focus trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(host);
    document.body.appendChild(host);

    focus(host);

    // focus trigger strategy has 100 milliseconds delay before firing show$
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(2);
  }));
});

describe('noop-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        NbTriggerStrategyBuilderService,
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
      ],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder
      .trigger(NbTrigger.NOOP)
      .host(host)
      .container(withContainer(container));
  });

  it('should NOT fire show$ when hover/click/focus on host', fakeAsync(() => {
    const showSpy = createSpy('showSpy');
    const triggerStrategy = triggerStrategyBuilder
      .container(() => null)
      .build();
    triggerStrategy.show$.subscribe(showSpy);

    focus(host);
    click(host);
    mouseEnter(host);
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(0);
  }));

  it('should NOT fire hide$ when hover out from host', fakeAsync(() => {
    const showSpy = createSpy('showSpy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(showSpy);
    mouseLeave(host);
    blur(host);
    focus(document);
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(0);
  }));
});
