import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/index';

export interface NbScrollPosition {
  x: number;
  y: number;
}

@Injectable()
export class NbLayoutScrollService {

  private scrollPositionReq$ = new Subject<any>();
  private manualScroll$ = new Subject<NbScrollPosition>();
  private scroll$ = new Subject<any>();

  /**
   * Scroll position
   *
   * @returns {Observable<NbScrollPosition>}
   */
  getPosition(): Observable<NbScrollPosition> {
    const listener = new ReplaySubject<NbScrollPosition>();
    this.scrollPositionReq$.next({ listener: listener });

    return listener.asObservable();
  }

  /**
   * Sets scroll position
   * @param {number} x
   * @param {number} y
   */
  scrollTo(x: number, y: number) {
    this.manualScroll$.next({ x, y });
  }

  /**
   * Scroll events
   * @returns {Observable<any>}
   */
  onScroll() {
    return this.scroll$.pipe(share<any>());
  }

  /**
   * Triggered when scroll position was changed manually by `scrollTo` method
   *
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
