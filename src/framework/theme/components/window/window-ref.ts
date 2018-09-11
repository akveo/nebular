import { ComponentRef } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NbWindowComponent } from './window.component';
import { NbWindowConfig, NbWindowState, NbWindowStateChange } from './window-types';

export class NbWindowRef {
  componentRef: ComponentRef<NbWindowComponent>;

  private _prevState: NbWindowState;
  private _state: NbWindowState;
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
  get stateChange(): Observable<NbWindowStateChange> {
    return this.stateChange$.asObservable();
  }

  private _closed = false;
  private closed$ = new Subject();
  get onClose() {
    return this.closed$.asObservable();
  }

  constructor(public config: NbWindowConfig) {
    this.state = config.initialState;
  }

  minimize() {
    this.state = NbWindowState.MINIMIZED;
  }

  maximize() {
    this.state = NbWindowState.MAXIMIZED;
  }

  fullScreen() {
    this.state = NbWindowState.FULL_SCREEN;
  }

  toPreviousState() {
    this.state = this._prevState;
  }

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
