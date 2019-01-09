import { ComponentRef, Inject, Injectable } from '@angular/core';
import { EMPTY, fromEvent as observableFromEvent, merge as observableMerge, Observable } from 'rxjs';
import { debounceTime, delay, filter, repeat, share, switchMap, takeUntil, takeWhile, map } from 'rxjs/operators';
import { NB_DOCUMENT } from '../../../theme.options';

export enum NbTrigger {
  NOOP = 'noop',
  CLICK = 'click',
  HOVER = 'hover',
  HINT = 'hint',
  FOCUS = 'focus',
}

/**
 * Provides entity with two event stream: show and hide.
 * Each stream provides different events depends on implementation.
 * We have three main trigger strategies: click, hint and hover.
 * */
export interface NbTriggerStrategy {
  show$: Observable<never | Event>;
  hide$: Observable<never | Event>;
}

/**
 * TODO maybe we have to use renderer.listen instead of observableFromEvent?
 * Renderer provides capability use it in service worker, ssr and so on.
 * */
export abstract class NbTriggerStrategyBase implements NbTriggerStrategy {

  protected isNotOnHostOrContainer(event: Event): boolean {
    return !this.isOnHost(event) && !this.isOnContainer(event);
  }

  protected isOnHostOrContainer(event: Event): boolean {
    return this.isOnHost(event) || this.isOnContainer(event);
  }

  protected isOnHost({ target }: Event): boolean {
    return this.host.contains(target as Node);
  }

  protected isOnContainer({ target }: Event): boolean {
    return this.container() && this.container().location.nativeElement.contains(target);
  }

  protected isElementInBody(element: HTMLElement): boolean {
    return this.document.body.contains(element);
  }

  protected isHostInBody(): boolean {
    return this.isElementInBody(this.host);
  }

  abstract show$: Observable<Event>;
  abstract hide$: Observable<Event>;

  constructor(protected document: Document, protected host: HTMLElement, protected container: () => ComponentRef<any>) {
  }
}

/**
 * Creates show and hide event streams.
 * Fires toggle event when the click was performed on the host element.
 * Fires close event when the click was performed on the document but
 * not on the host or container.
 * */
export class NbClickTriggerStrategy extends NbTriggerStrategyBase {

  // since we should track click for both SHOW and HIDE event we firstly need to track the click and the state
  // of the container and then later on decide should we hide it or show
  // if we track the click & state separately this will case a behavior when the container is getting shown
  // and then hidden right away
  protected click$: Observable<[boolean, Event]> = observableFromEvent<Event>(this.document, 'click')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      map((event: Event) => [!this.container() && this.isOnHost(event), event] as [boolean, Event]),
      share(),
    );

  readonly show$: Observable<Event> = this.click$
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(([shouldShow]) => shouldShow),
      map(([, event]) => event),
    );

  readonly hide$: Observable<Event> = this.click$
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(([shouldShow, event]) => !shouldShow && !this.isOnContainer(event)),
      map(([, event]) => event),
    );
}

/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element and stops out of the host and popover container.
 * */
export class NbHoverTriggerStrategy extends NbTriggerStrategyBase {

  show$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(() => !this.container()),
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      repeat(),
    );

  hide$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseleave')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      switchMap(() => observableFromEvent<Event>(this.document, 'mousemove')
        .pipe(
          takeWhile(() => this.isHostInBody()),
          debounceTime(100),
          takeWhile(() => !!this.container()),
          filter(event => this.isNotOnHostOrContainer(event),
          ),
        ),
      ),
    );
}

/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element.
 * */
export class NbHintTriggerStrategy extends NbTriggerStrategyBase {
  show$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      // this `delay & takeUntil & repeat` operators combination is a synonym for `conditional debounce`
      // meaning that if one event occurs in some time after the initial one we won't react to it
      repeat(),
    );

  hide$: Observable<Event> = observableFromEvent(this.host, 'mouseleave');
}


/**
 * Creates show and hide event streams.
 * Fires open event when a focus is on the host element and stay over at least 100 milliseconds.
 * Fires close event when the focus leaves the host element.
 * */
export class NbFocusTriggerStrategy extends NbTriggerStrategyBase {

  protected focusOut$: Observable<Event> = observableFromEvent<Event>(this.host, 'focusout')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      switchMap(() => observableFromEvent<Event>(this.document, 'focusin')
        .pipe(
          takeWhile(() => !!this.container()),
          filter(event => this.isNotOnHostOrContainer(event)),
        ),
      ),
    );

  protected clickIn$: Observable<Event> = observableFromEvent<Event>(this.host, 'click')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(() => !this.container()),
    );

  protected clickOut$: Observable<Event> = observableFromEvent<Event>(this.document, 'click')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(() => !!this.container()),
      filter(event => this.isNotOnHostOrContainer(event)),
    );

  protected tabKeyPress$: Observable<Event> = observableFromEvent<Event>(this.document, 'keydown')
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter((event: KeyboardEvent) => event.keyCode === 9),
      filter(() => !!this.container()),
    );

  show$: Observable<Event> = observableMerge(observableFromEvent<Event>(this.host, 'focusin'), this.clickIn$)
    .pipe(
      takeWhile(() => this.isHostInBody()),
      filter(() => !this.container()),
      debounceTime(100),
      takeUntil(observableFromEvent(this.host, 'focusout')),
      repeat(),
    );

  hide$ = observableMerge(this.focusOut$, this.tabKeyPress$, this.clickOut$)
    .pipe(takeWhile(() => this.isHostInBody()));
}

@Injectable()
export class NbTriggerStrategyBuilderService {

  protected _host: HTMLElement;
  protected _container: () => ComponentRef<any>;
  protected _trigger: NbTrigger;

  constructor(@Inject(NB_DOCUMENT) protected _document) {
  }

  trigger(trigger: NbTrigger): this {
    this._trigger = trigger;
    return this;
  }

  host(host: HTMLElement): this {
    this._host = host;
    return this;
  }

  container(container: () => ComponentRef<any>): this {
    this._container = container;
    return this;
  }

  build(): NbTriggerStrategy {
    switch (this._trigger) {
      case NbTrigger.CLICK:
        return new NbClickTriggerStrategy(this._document, this._host, this._container);
      case NbTrigger.HINT:
        return new NbHintTriggerStrategy(this._document, this._host, this._container);
      case NbTrigger.HOVER:
        return new NbHoverTriggerStrategy(this._document, this._host, this._container);
      case NbTrigger.FOCUS:
        return new NbFocusTriggerStrategy(this._document, this._host, this._container);
      case NbTrigger.NOOP:
        return {
          show$: EMPTY,
          hide$: EMPTY,
        };
      default:
        throw new Error('Trigger have to be provided');
    }
  }
}
