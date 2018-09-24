import { DOCUMENT } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { NbTrigger, NbTriggerStrategyBuilder } from './overlay-trigger';
import { NB_DOCUMENT } from '../../../theme.options';
import createSpy = jasmine.createSpy;


describe('click-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilder;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  const withContainer = el => () => ({ location: { nativeElement: el } }) as ComponentRef<any>;

  const click = el => el.dispatchEvent(new Event('click'));

  const createElement = () => document.createElement('div');

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({ providers: [{ provide: NB_DOCUMENT, useExisting: DOCUMENT }] });
    document = bed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder = new NbTriggerStrategyBuilder()
      .document(document)
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
});

describe('hover-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilder;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  const withContainer = el => () => ({ location: { nativeElement: el } }) as ComponentRef<any>;

  const mouseMove = el => el.dispatchEvent(new Event('mousemove'));

  const mouseEnter = el => el.dispatchEvent(new Event('mouseenter'));

  const mouseLeave = el => el.dispatchEvent(new Event('mouseleave'));

  const createElement = () => document.createElement('div');

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({ providers: [{ provide: NB_DOCUMENT, useExisting: DOCUMENT }] });
    document = bed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder = new NbTriggerStrategyBuilder()
      .document(document)
      .trigger(NbTrigger.HOVER)
      .host(host)
      .container(withContainer(container));
  });

  it('should fire show$ when hover on host', done => {
    const triggerStrategy = triggerStrategyBuilder.build();
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
});

describe('hint-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilder;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  const withContainer = el => () => ({ location: { nativeElement: el } }) as ComponentRef<any>;

  const mouseEnter = el => el.dispatchEvent(new Event('mouseenter'));

  const mouseLeave = el => el.dispatchEvent(new Event('mouseleave'));

  const createElement = () => document.createElement('div');

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({ providers: [{ provide: NB_DOCUMENT, useExisting: DOCUMENT }] });
    document = bed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder = new NbTriggerStrategyBuilder()
      .document(document)
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
});

describe('focus-trigger-strategy', () => {
  let triggerStrategyBuilder: NbTriggerStrategyBuilder;
  let document: Document;
  let host: HTMLElement;
  let container: HTMLElement;

  const withContainer = el => () => ({ location: { nativeElement: el } }) as ComponentRef<any>;

  const focus = el => el.dispatchEvent(new Event('focusin', { bubbles: true }));

  const blur = el => el.dispatchEvent(new Event('focusout', { bubbles: true }));

  const click = el => el.dispatchEvent(new Event('click', { bubbles: true }));

  const tab = (el, target) => el.dispatchEvent(new KeyboardEvent('keydown', <any> {
    target: target,
    keyCode: 9,
  }));

  const createElement = () => document.createElement('div');

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({ providers: [{ provide: NB_DOCUMENT, useExisting: DOCUMENT }] });
    document = bed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    host = createElement();
    container = createElement();
    triggerStrategyBuilder = new NbTriggerStrategyBuilder()
      .document(document)
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
    tab(document, host);
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
});
