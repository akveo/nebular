import { fromEvent as observableFromEvent } from 'rxjs/observable/fromEvent';
import { NbPopoverMode, NbPopoverTrigger } from './model';
import { debounceTime, filter, map, mergeMap, takeWhile } from 'rxjs/operators';
import { empty as observableEmpty } from 'rxjs/observable/empty';
import { combineLatest } from 'rxjs/observable/combineLatest';

/**
 * Describes popover triggers strategies based on popover {@link NbPopoverMode} mode.
 * */
const NB_TRIGGERS = {

  /**
   * Creates open and close events streams based on popover {@link NbPopoverMode#CLICK} mode.
   * Fires open event when click was performed on the host element.
   * Fires close event when click was performed on the document but
   * not on the host or container or popover container isn't rendered yet.
   *
   * @param host {HTMLElement} popover host element.
   * @param getContainer {Function} popover container getter.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.CLICK](host: HTMLElement, getContainer: Function): NbPopoverTrigger {
    return {
      open: observableEmpty(),
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
   * Fires open event when mouse hovers over the host element.
   * Fires close event when mouse leaves the host element.
   *
   * @param host {HTMLElement} popover host element.
   * @param getContainer {Function} popover container getter.
   *
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.HOVER](host: HTMLElement, getContainer: Function): NbPopoverTrigger {
    return {
      open: combineLatest(
        observableFromEvent<Event>(host, 'mouseenter')
          .pipe(debounceTime(100)),
        observableFromEvent<Event>(host, 'mouseout'),
      ).pipe(
        filter(([e1, e2]) => e1.timeStamp - e2.timeStamp > 100),
        map(([e1]) => e1),
      ),
      close: observableFromEvent<Event>(host, 'mouseout').pipe(
        mergeMap(() => observableFromEvent<Event>(document, 'mousemove')
          .pipe(
            debounceTime(100),
            takeWhile(() => !!getContainer()),
            filter(event => {
              return !host.contains(event.target as Node)
                && !getContainer().location.nativeElement.contains(event.target)
            }),
          ),
        ),
      ),
      toggle: observableEmpty(),
    }
  },
};

export class NbTriggerHelper {

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
  static createTrigger(host: HTMLElement, getContainer: Function, mode: NbPopoverMode): NbPopoverTrigger {
    const createTrigger = NB_TRIGGERS[mode];
    return createTrigger.call(NB_TRIGGERS, host, getContainer);
  }
}
