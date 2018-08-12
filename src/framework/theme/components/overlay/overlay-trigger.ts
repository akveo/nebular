import { Inject, Injectable } from '@angular/core';

import { EMPTY as EMPTY$, fromEvent as observableFromEvent, Observable } from 'rxjs';
import { debounceTime, delay, filter, repeat, switchMap, takeUntil, takeWhile } from 'rxjs/operators';

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

  constructor(protected host: HTMLElement, protected container: HTMLElement, protected document: Document) {
  }
}

export class NbClickTriggerStrategy extends NbTriggerStrategy {

  show: Observable<Event> = EMPTY$;

  hide: Observable<Event> = observableFromEvent<Event>(this.document, 'click')
    .pipe(filter((event: Event) => this.isNotHostOrContainer(event)));

  toggle: Observable<Event> = observableFromEvent(this.host, 'click');

  protected isNotHostOrContainer(event: Event): boolean {
    return !this.host.contains(event.target as Node)
      && !this.container.contains(event.target as Node);
  }
}

export class NbHoverTriggerStrategy extends NbTriggerStrategy {

  show: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      repeat(),
    );

  hide: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseleave')
    .pipe(
      switchMap(() => observableFromEvent<Event>(this.document, 'mousemove')
        .pipe(
          debounceTime(100),
          // TODO unsubscribe after hide
          filter(event => !this.host.contains(event.target as Node)
            && !this.container.contains(event.target as Node),
          ),
        ),
      ),
    );

  toggle: Observable<Event> = EMPTY$;
}

export class NbHintTriggerStrategy extends NbTriggerStrategy {

  show: Observable<Event> = observableFromEvent<Event>(this.host, 'mouseenter')
    .pipe(
      delay(100),
      takeUntil(observableFromEvent(this.host, 'mouseleave')),
      repeat(),
    );

  hide: Observable<Event> = observableFromEvent(this.host, 'mouseleave');

  toggle: Observable<Event> = EMPTY$;
}

@Injectable()
export class NbTriggerFactoryService {
  constructor(@Inject(NB_DOCUMENT) protected document) {
  }

  createTrigger(trigger: NbTrigger, host: HTMLElement, container: HTMLElement): NbTriggerStrategy {
    switch (trigger) {
      case NbTrigger.CLICK:
        return new NbClickTriggerStrategy(host, container, this.document);
      case NbTrigger.HINT:
        return new NbHintTriggerStrategy(host, container, this.document);
      case NbTrigger.HOVER:
        return new NbHoverTriggerStrategy(host, container, this.document);
    }
  }
}

@Injectable()
export class NbTriggerBuilderService {
  protected _trigger: NbTrigger;
  protected _host: HTMLElement;
  protected _container: HTMLElement;

  constructor(protected triggerFactory: NbTriggerFactoryService) {
  }

  trigger(trigger: NbTrigger): this {
    this._trigger = trigger;
    return this;
  }

  host(host: HTMLElement): this {
    this._host = host;
    return this;
  }

  container(container: HTMLElement): this {
    this._container = container;
    return this;
  }

  build(): NbTriggerStrategy {
    return this.triggerFactory.createTrigger(this._trigger, this._host, this._container);
  }
}
