import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

export interface NbScrollPosition {
  x: number;
  y: number;
}

@Injectable()
export class NbLayoutScrollService {

  private manualScroll$ = new Subject<NbScrollPosition>();
  private scroll$ = new Subject<any>();

  /**
   * Sets scroll position
   * @param {number} x
   * @param {number} y
   */
  scrollTo(x: number, y: number) {
    this.manualScroll$.next({ x, y });
  }

  /**
   * Will fire scroll change
   * @param {any} event
   */
  fireScrollChange(event: any) {
    this.scroll$.next(event);
  }

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
}
