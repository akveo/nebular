import { ComponentRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NbWindowComponent } from './window.component';
import { NbWindowConfig, NbWindowState, NbWindowStateChange } from './window-types';

export class NbWindowRef {
  componentRef: ComponentRef<NbWindowComponent>;

  private _state: NbWindowState;
  get state() {
    return this._state;
  }
  set state(newState: NbWindowState) {
    if (newState && this._state !== newState) {
      const change = { oldState: this.state, newState };
      this._state = newState;
      this.stateChange$.next(change);
    }
  }

  private stateChange$ = new Subject<NbWindowStateChange>();
  get stateChange(): Observable<NbWindowStateChange> {
    return this.stateChange$
      .asObservable()
      .pipe(startWith({ oldState: null, newState: this.state }));
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
