import { ComponentRef } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NbWindowComponent } from './window.component';
import { NbWindowConfig, NbWindowState, NbWindowStateChange } from './window-types';

/**
 * The `NbWindowRef` helps to manipulate window after it was created.
 * The window can be dismissed by using `close` method of the windowRef.
 * You can access rendered component as `componentRef` property of the windowRef.
 */
export class NbWindowRef {
  componentRef: ComponentRef<NbWindowComponent>;

  private _prevState: NbWindowState;
  private _state: NbWindowState;
  /**
   * Current window state.
   */
  get state() {
    return this._state;
  }
  set state(newState: NbWindowState) {
    if (newState && this._state !== newState) {
      this._prevState = this.state;
      this._state = newState;
      this.stateChange$.next({ oldState: this._prevState, newState });
    }
  }

  private stateChange$ = new ReplaySubject<NbWindowStateChange>(1);
  /**
   * Emits when window state change.
   */
  get stateChange(): Observable<NbWindowStateChange> {
    return this.stateChange$.asObservable();
  }

  private _closed = false;
  private closed$ = new Subject();
  /**
   * Emits when window was closed.
   */
  get onClose() {
    return this.closed$.asObservable();
  }

  constructor(public config: NbWindowConfig) {
    this.state = config.initialState;
  }

  /**
   * Minimize window.
   */
  minimize() {
    this.state = NbWindowState.MINIMIZED;
  }

  /**
   * Maximize window.
   */
  maximize() {
    this.state = NbWindowState.MAXIMIZED;
  }

  /**
   * Set window on top.
   */
  fullScreen() {
    this.state = NbWindowState.FULL_SCREEN;
  }

  toPreviousState() {
    this.state = this._prevState;
  }

  /**
   * Closes window.
   * */
  close() {
    if (this._closed) {
      return;
    }

    this._closed = true;
    this.componentRef.destroy();
    this.stateChange$.complete();
    this.closed$.next();
    this.closed$.complete();
  }
}
