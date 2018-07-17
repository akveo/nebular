import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NbScrollPosition } from './scroll.service';

export interface NbLayoutContainerSize {
  width: number;
  height: number;
}

@Injectable()
export class NbRulerService {

  containerScrollPositionReq$ = new Subject();
  scrollContainerSizeReq$ = new Subject();

  getContainerScrollPosition(): Observable<NbScrollPosition> {
    const listener = new ReplaySubject<NbScrollPosition>();
    this.containerScrollPositionReq$.next({ listener: listener });

    return listener.asObservable();
  }

  getScrollContainerSize(): Observable<NbLayoutContainerSize> {
    const listener = new ReplaySubject<NbLayoutContainerSize>();
    this.scrollContainerSizeReq$.next({ listener: listener });

    return listener.asObservable();
  }
}
