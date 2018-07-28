import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

/**
 * Scroll position type
 */
export interface NbScrollPosition {

  /**
   * x - left
   * @type {number}
   */
  x: number;

  /**
   * y - top
   * @type {number}
   */
  y: number;
}

/**
 * Layout scroll service. Provides information about current scroll position,
 * as well as methods to update position of the scroll.
 *
 * The reason we added this service is that in Nebular there are two scroll modes:
 * - the default mode when scroll is on body
 * - and the `withScroll` mode, when scroll is removed from the body and moved to an element inside of the
 * `nb-layout` component
 */
@Injectable()
export class NbLayoutScrollService {

  private scrollPositionReq$ = new Subject<any>();
  private manualScroll$ = new Subject<NbScrollPosition>();
  private scroll$ = new Subject<any>();

  /**
   * Returns scroll position
   *
   * @returns {Observable<NbScrollPosition>}
   */
  getPosition(): Observable<NbScrollPosition> {
    const listener = new ReplaySubject<NbScrollPosition>();
    this.scrollPositionReq$.next({ listener });

    return listener.asObservable();
  }

  /**
   * Sets scroll position
   *
   * @param {number} x
   * @param {number} y
   */
  scrollTo(x: number = null, y: number = null) {
    this.manualScroll$.next({ x, y });
  }

  /**
   * Returns a stream of scroll events
   *
   * @returns {Observable<any>}
   */
  onScroll() {
    return this.scroll$.pipe(share<any>());
  }

  /**
   * @private
   * @returns Observable<NbScrollPosition>.
   */
  onManualScroll(): Observable<NbScrollPosition> {
    return this.manualScroll$.pipe(share<NbScrollPosition>());
  }

  /**
   * @private
   * @returns {Subject<any>}
   */
  onGetPosition(): Subject<any> {
    return this.scrollPositionReq$;
  }

  /**
   * @private
   * @param {any} event
   */
  fireScrollChange(event: any) {
    this.scroll$.next(event);
  }
}
