import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComponentRef, DOCUMENT } from '@angular/core';
import { NbTrigger, NbTriggerStrategyBuilderService, NB_DOCUMENT } from '@nebular/theme';
import createSpy = jasmine.createSpy;

// TODO: move into a separate file
const withContainer = (el) => () => ({ location: { nativeElement: el } } as ComponentRef<any>);
const createElement = (name = 'div') => {
  const el = document.createElement(name);
  document.body.appendChild(el);
  return el;
};
const click = (el) => el.dispatchEvent(new Event('click', { bubbles: true }));
const mouseMove = (el) => el.dispatchEvent(new Event('mousemove'));
const mouseEnter = (el) => el.dispatchEvent(new Event('mouseenter'));
const mouseLeave = (el) => el.dispatchEvent(new Event('mouseleave'));
const focus = (el) => el.dispatchEvent(new Event('focusin', { bubbles: true }));
const blur = (el) => el.dispatchEvent(new Event('focusout', { bubbles: true }));
const tab = (el) =>
  el.dispatchEvent(
    new KeyboardEvent('keydown', <any>{
      bubbles: true,
      keyCode: 9,
    }),
  );

describe('click-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilderService;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [NbTriggerStrategyBuilderService, { provide: NB_DOCUMENT, useExisting: DOCUMENT }],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder.trigger(NbTrigger.CLICK).host(host).container(withContainer(container));
  });

  it('should fire show$ when click on host without container', () => {
    const showSpy = jasmine.createSpy('show spy');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

    triggerStrategy.show$.subscribe(showSpy);
    click(host);

    expect(showSpy).toHaveBeenCalled();
  });

  it('should fire hide$ when click on host with container', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    click(host);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should fire hide$ when click on document', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    click(document);

    expect(hideSpy).toHaveBeenCalled();
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
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

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
      providers: [NbTriggerStrategyBuilderService, { provide: NB_DOCUMENT, useExisting: DOCUMENT }],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder.trigger(NbTrigger.HOVER).host(host).container(withContainer(container));
  });

  it('should fire show$ when hover on host', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show spy');

    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();
    triggerStrategy.show$.subscribe(showSpy);
    mouseEnter(host);
    tick(100);

    expect(showSpy).toHaveBeenCalled();
  }));

  it('should fire hide$ when hover out of host', fakeAsync(() => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    mouseEnter(host);
    mouseLeave(host);
    mouseMove(document);
    tick(100);

    expect(hideSpy).toHaveBeenCalled();
  }));

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
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

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
      providers: [NbTriggerStrategyBuilderService, { provide: NB_DOCUMENT, useExisting: DOCUMENT }],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder.trigger(NbTrigger.HINT).host(host).container(withContainer(container));
  });

  it('should fire show$ when hover on host', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.show$.subscribe(showSpy);
    mouseEnter(host);
    tick(100);

    expect(showSpy).toHaveBeenCalled();
  }));

  it('should fire hide$ when hover out from host', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    mouseLeave(host);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should not destroy when host reattached', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder.build();

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
      providers: [NbTriggerStrategyBuilderService, { provide: NB_DOCUMENT, useExisting: DOCUMENT }],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder.trigger(NbTrigger.FOCUS).host(host).container(withContainer(container));
  });

  it('should fire show$ when focused into host', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show spy');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

    triggerStrategy.show$.subscribe(showSpy);
    focus(host);
    tick(100);

    expect(showSpy).toHaveBeenCalled();
  }));

  it('should fire show$ when clicked into host', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show spy');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

    triggerStrategy.show$.subscribe(showSpy);
    click(host);
    tick(100);

    expect(showSpy).toHaveBeenCalled();
  }));

  it('should fire hide$ when clicked on document', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    click(document);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should fire hide$ when tab pressed', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    tab(host);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should fire hide$ when focusout', () => {
    const hideSpy = jasmine.createSpy('hide spy');
    const triggerStrategy = triggerStrategyBuilder.build();

    triggerStrategy.hide$.subscribe(hideSpy);
    blur(host);
    focus(document);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should fire show$ once when focused and clicked into host', fakeAsync(() => {
    const showSpy = createSpy('showSpy');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();
    triggerStrategy.show$.subscribe(showSpy);
    focus(host);
    click(host);
    tick(100);

    expect(showSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not destroy when host reattached', fakeAsync(() => {
    const showSpy = jasmine.createSpy('show');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();

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
      providers: [NbTriggerStrategyBuilderService, { provide: NB_DOCUMENT, useExisting: DOCUMENT }],
    });
    document = bed.inject(NB_DOCUMENT);
    triggerStrategyBuilder = bed.inject(NbTriggerStrategyBuilderService);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder.trigger(NbTrigger.NOOP).host(host).container(withContainer(container));
  });

  it('should NOT fire show$ when hover/click/focus on host', fakeAsync(() => {
    const showSpy = createSpy('showSpy');
    const triggerStrategy = triggerStrategyBuilder.container(() => null).build();
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
