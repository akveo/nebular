import { Inject, Injectable } from '@angular/core';

import { EMPTY as EMPTY$, fromEvent as observableFromEvent, Observable } from 'rxjs';
import { debounceTime, delay, filter, repeat, switchMap, takeUntil } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';


export enum NbTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  HINT = 'hint',
}

export abstract class NbTriggerStrategy {
  abstract show: Observable<Event>;
  abstract hide: Observable<Event>;
  abstract toggle: Observable<Event>;

  protected _host: HTMLElement;
  protected _container: HTMLElement;

  constructor(protected document) {
  }

  host(host: HTMLElement): this {
    this._host = host;
    return this;
  }

  container(container: HTMLElement): this {
    this._container = container;
    return this;
  }
}

export class NbClickTriggerStrategy extends NbTriggerStrategy {

  show: Observable<Event> = EMPTY$;

  hide: Observable<Event> = observableFromEvent<Event>(this.document, 'click')
    .pipe(filter((event: Event) => this.isNotHostOrContainer(event)));

  get toggle(): Observable<Event> {
    return observableFromEvent(this._host, 'click');
  }

  protected isNotHostOrContainer(event: Event): boolean {
    return !this._host.contains(event.target as Node)
      && !this._container.contains(event.target as Node);
  }
}

export class NbHoverTriggerStrategy extends NbTriggerStrategy {

  toggle: Observable<Event> = EMPTY$;

  get show(): Observable<Event> {
    return observableFromEvent<Event>(this._host, 'mouseenter')
      .pipe(
        delay(100),
        takeUntil(observableFromEvent(this._host, 'mouseleave')),
        repeat(),
      );
  }

  get hide(): Observable<Event> {
    return observableFromEvent<Event>(this._host, 'mouseleave')
      .pipe(
        switchMap(() => observableFromEvent<Event>(this.document, 'mousemove')
          .pipe(
            debounceTime(100),
            // TODO unsubscribe after hide
            filter(event => !this._host.contains(event.target as Node)
              && !this._container.contains(event.target as Node),
            ),
          ),
        ),
      );
  }
}

export class NbHintTriggerStrategy extends NbTriggerStrategy {

  toggle: Observable<Event> = EMPTY$;

  get show(): Observable<Event> {
    return observableFromEvent<Event>(this._host, 'mouseenter')
      .pipe(
        delay(100),
        takeUntil(observableFromEvent(this._host, 'mouseleave')),
        repeat(),
      );
  }

  get hide(): Observable<Event> {
    return observableFromEvent(this._host, 'mouseleave');
  }
}

@Injectable()
export class NbTriggerBuilderService {
  constructor(@Inject(NB_DOCUMENT) protected document) {
  }

  trigger(trigger: NbTrigger): NbTriggerStrategy {
    switch (trigger) {
      case NbTrigger.CLICK:
        return new NbClickTriggerStrategy(this.document);
      case NbTrigger.HINT:
        return new NbHintTriggerStrategy(this.document);
      case NbTrigger.HOVER:
        return new NbHoverTriggerStrategy(this.document);
    }
  }
}
