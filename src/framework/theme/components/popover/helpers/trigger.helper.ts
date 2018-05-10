import { Injectable, Inject } from '@angular/core';
import { fromEvent as observableFromEvent, EMPTY as EMPTY$ } from 'rxjs';
import { filter, delay, takeWhile, debounceTime, switchMap, repeat, takeUntil } from 'rxjs/operators';


import { NB_DOCUMENT } from '../../../theme.options';
import { NbPopoverMode, NbPopoverTrigger } from './model';

/**
 * Describes popover triggers strategies based on popover {@link NbPopoverMode} mode.
 * */
const NB_TRIGGERS = {

  /**
   * Creates toggle and close events streams based on popover {@link NbPopoverMode#CLICK} mode.
   * Fires toggle event when click was performed on the host element.
   * Fires close event when click was performed on the document but
   * not on the host or container or popover container isn't rendered yet.
   *
   * @param host {HTMLElement} popover host element.
   * @param getContainer {Function} popover container getter.
   * @param document {Document} document ref.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.CLICK](host: HTMLElement, getContainer: Function, document: Document): NbPopoverTrigger {
    return {
      open: EMPTY$,
      close: observableFromEvent<Event>(document, 'click')
        .pipe(
          filter(event => !host.contains(event.target as Node)
            && getContainer()
            && !getContainer().location.nativeElement.contains(event.target)),
        ),
      toggle: observableFromEvent(host, 'click'),
    };
  },

  /**
   * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
   * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
   * Fires close event when mouse leaves the host element and stops out of the host and popover container.
   *
   * @param host {HTMLElement} popover host element.
   * @param getContainer {Function} popover container getter.
   * @param document {Document} document ref.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.HOVER](host: HTMLElement, getContainer: Function, document: Document): NbPopoverTrigger {
    return {
      open: observableFromEvent<Event>(host, 'mouseenter')
        .pipe(
          delay(100),
          takeUntil(observableFromEvent(host, 'mouseleave')),
          repeat(),
        ),
      close: observableFromEvent<Event>(host, 'mouseleave')
        .pipe(
          switchMap(() => observableFromEvent<Event>(document, 'mousemove')
            .pipe(
              debounceTime(100),
              takeWhile(() => !!getContainer()),
              filter(event => !host.contains(event.target as Node)
                && !getContainer().location.nativeElement.contains(event.target),
              ),
            ),
          ),
        ),
      toggle: EMPTY$,
    }
  },

  /**
   * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
   * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
   * Fires close event when mouse leaves the host element.
   *
   * @param host {HTMLElement} popover host element.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.HINT](host: HTMLElement): NbPopoverTrigger {
    return {
      open: observableFromEvent<Event>(host, 'mouseenter')
        .pipe(
          delay(100),
          takeUntil(observableFromEvent(host, 'mouseleave')),
          repeat(),
        ),
      close: observableFromEvent(host, 'mouseleave'),
      toggle: EMPTY$,
    }
  },
};

@Injectable()
export class NbTriggerHelper {

  constructor(@Inject(NB_DOCUMENT) private document) {
  }

  /**
   * Creates open and close events streams based on popover {@link NbPopoverMode} mode.
   *
   * @param host {HTMLElement} popover host element.
   * @param getContainer {Function} popover container getter.
   * Getter required because listen can be called when container isn't initialized.
   * @param mode {NbPopoverMode} describes container triggering strategy.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  createTrigger(host: HTMLElement, getContainer: Function, mode: NbPopoverMode): NbPopoverTrigger {
    const createTrigger = NB_TRIGGERS[mode];
    return createTrigger.call(NB_TRIGGERS, host, getContainer, this.document);
  }
}
