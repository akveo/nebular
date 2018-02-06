import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import 'rxjs/observable/fromEvent';

/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export enum NbPopoverMode {
  CLICK = 'click',
  HOVER = 'hover',
}

export class NbTrigger {
  open: Observable<Event>;
  close: Observable<Event>;
}

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
   * @return {NbTrigger} open and close events streams.
   * */
  [NbPopoverMode.CLICK](host: HTMLElement, getContainer: Function): NbTrigger {
    return {
      open: Observable.fromEvent(host, 'click'),
      close: Observable.fromEvent<Event>(document, 'click')
        .pipe(
          filter(event => !host.contains(event.target as Node)),
          filter(() => getContainer()),
          filter(event => !getContainer().location.nativeElement.contains(event.target)),
        ),
    };
  },

  /**
   * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
   * Fires open event when mouse hovers over the host element.
   * Fires close event when mouse leaves the host element.
   *
   * @param host {HTMLElement} popover host element.
   *
   * @return {NbTrigger} open and close events streams.
   * */
  [NbPopoverMode.HOVER](host: HTMLElement): NbTrigger {
    return {
      open: Observable.fromEvent(host, 'mouseover'),
      close: Observable.fromEvent(host, 'mouseout'),
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
   * @return {NbTrigger} open and close events streams.
   * */
  static createTrigger(host: HTMLElement, getContainer: Function, mode: NbPopoverMode): NbTrigger {
    const createTrigger = NB_TRIGGERS[mode];
    return createTrigger.call(NB_TRIGGERS, host, getContainer);
  }
}
