import { fromEvent as observableFromEvent, merge as observableMerge, Observable, Subject } from 'rxjs';
import { debounceTime, delay, filter, repeat, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { ComponentRef } from '@angular/core';


export enum NbTrigger {
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
/**
 * TODO maybe we have to use renderer.listen instead of observableFromEvent?
 * Renderer provides capability use it in service worker, ssr and so on.
 * */
export abstract class NbTriggerStrategy {
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
export class NbClickTriggerStrategy extends NbTriggerStrategy {
  protected show: Subject<Event> = new Subject();
  readonly show$: Observable<Event> = this.show.asObservable();

  protected hide: Subject<Event> = new Subject();
  readonly hide$: Observable<Event> = observableMerge(
    this.hide.asObservable(),
    observableFromEvent<Event>(this.document, 'click')
      .pipe(filter((event: Event) => this.isNotHostOrContainer(event))),
  );

  constructor(protected document: Document, protected host: HTMLElement, protected container: () => ComponentRef<any>) {
    super(document, host, container);
    this.subscribeOnHostClick();
  }

  protected subscribeOnHostClick() {
    observableFromEvent(this.host, 'click')
      .subscribe((event: Event) => {
        if (this.isContainerExists()) {
          this.hide.next(event);
        } else {
          this.show.next(event);
        }
      })
  }

  protected isContainerExists(): boolean {
    return !!this.container();
  }

  protected isNotHostOrContainer(event: Event): boolean {
    return !this.host.contains(event.target as Node)
      && this.isContainerExists()
      && !this.container().location.nativeElement.contains(event.target as Node);
  }
}

/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element and stops out of the host and popover container.
 * */
export class NbHoverTriggerStrategy extends NbTriggerStrategy {

  show$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      repeat(),
    );

  hide$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseleave')
    .pipe(
      switchMap(() => observableFromEvent<Event>(this.document, 'mousemove')
        .pipe(
          debounceTime(100),
          takeWhile(() => !!this.container()),
          filter(event => !this.host.contains(event.target as Node)
            && !this.container().location.nativeElement.contains(event.target as Node),
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
export class NbHintTriggerStrategy extends NbTriggerStrategy {
  show$: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      repeat(),
    );

  hide$: Observable<Event> = observableFromEvent(this.host, 'mouseleave');
}


/**
 * Creates show and hide event streams.
 * Fires open event when a focus is on the host element and stay over at least 100 milliseconds.
 * Fires close event when the focus leaves the host element.
 * */
export class NbFocusTriggerStrategy extends NbTriggerStrategy {

  protected isNotOnHostOrContainer(event: Event): boolean {
    return !this.isOnHost(event) && !this.isOnContainer(event);
  }

  protected isOnHost({ target }: Event): boolean {
    return this.host.contains(target as Node);
  }

  protected isOnContainer({ target }: Event): boolean {
    return this.container() && this.container().location.nativeElement.contains(target);
  }

  protected focusOut$: Observable<Event> = observableFromEvent<Event>(this.host, 'focusout')
    .pipe(
      switchMap(() => observableFromEvent<Event>(this.document, 'focusin')
        .pipe(
          takeWhile(() => !!this.container()),
          filter(event => this.isNotOnHostOrContainer(event)),
        ),
      ),
    );

  protected clickIn$: Observable<Event> = observableFromEvent<Event>(this.host, 'click')
    .pipe(
      filter(() => !this.container()),
    );

  protected clickOut$: Observable<Event> = observableFromEvent<Event>(this.document, 'click')
    .pipe(
      filter(() => !!this.container()),
      filter(event => this.isNotOnHostOrContainer(event)),
    );

  protected tabKeyPress$: Observable<Event> = observableFromEvent<Event>(this.document, 'keydown')
    .pipe(
      filter((event: KeyboardEvent) => event.keyCode === 9),
      filter(() => !!this.container()),
    );

  show$: Observable<Event> = observableMerge(observableFromEvent<Event>(this.host, 'focusin'), this.clickIn$)
    .pipe(
      filter(() => !this.container()),
      debounceTime(100),
      takeUntil(observableFromEvent(this.host, 'focusout')),
      repeat(),
    );

  hide$ = observableMerge(this.focusOut$, this.tabKeyPress$, this.clickOut$);
}

export class NbTriggerStrategyBuilder {
  protected _host: HTMLElement;
  protected _container: () => ComponentRef<any>;
  protected _trigger: NbTrigger;
  protected _document: Document;

  document(document: Document): this {
    this._document = document;
    return this;
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
      default:
        throw new Error('Trigger have to be provided');
    }
  }
}
