import { ComponentRef } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NbWindowComponent } from './window.component';
import { NbWindowConfig, NbWindowState, NbWindowStateChange } from './window.options';

/**
 * The `NbWindowRef` helps to manipulate window after it was created.
 * The window can be dismissed by using `close` method of the windowRef.
 * You can access rendered component as `componentRef` property of the windowRef.
 */
export class NbWindowRef {
  componentRef: ComponentRef<NbWindowComponent>;

  protected prevStateValue: NbWindowState;
  protected stateValue: NbWindowState;
  /**
   * Current window state.
   */
  get state() {
    return this.stateValue;
  }
  set state(newState: NbWindowState) {
    if (newState && this.stateValue !== newState) {
      this.prevStateValue = this.state;
      this.stateValue = newState;
      this.stateChange$.next({ oldState: this.prevStateValue, newState });
    }
  }

  protected stateChange$ = new ReplaySubject<NbWindowStateChange>(1);
  /**
   * Emits when window state change.
   */
  get stateChange(): Observable<NbWindowStateChange> {
    return this.stateChange$.asObservable();
  }

  protected _closed = false;
  protected closed$ = new Subject();
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
    this.state = this.prevStateValue;
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
