import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { fromEvent as observableFromEvent } from 'rxjs/observable/fromEvent';

/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export enum NbPopoverMode {
  CLICK = 'click',
  HOVER = 'hover',
}

export class NbPopoverTrigger {
  toggle: Observable<Event>;
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
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.CLICK](host: HTMLElement, getContainer: Function): NbPopoverTrigger {
    return {
      toggle: observableFromEvent(host, 'click'),
      open: observableFromEvent(host, 'click'),
      close: observableFromEvent<Event>(document, 'click')
        .pipe(
          filter(event => !host.contains(event.target as Node)
            && getContainer()
            && !getContainer().location.nativeElement.contains(event.target)),
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
   * @return {NbPopoverTrigger} open and close events streams.
   * */
  [NbPopoverMode.HOVER](host: HTMLElement): NbPopoverTrigger {
    return {
      toggle: observableFromEvent(host, 'mouseover'),
      open: observableFromEvent(host, 'mouseenter'),
      close: observableFromEvent(host, 'mouseout'),
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
