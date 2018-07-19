import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export interface NbLayoutDimensions {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

@Injectable()
export class NbLayoutRulerService {

  private contentDimensionsReq$ = new Subject();

  /**
   * Content dimensions
   * @returns {Observable<NbLayoutDimensions>}
   */
  getDimensions(): Observable<NbLayoutDimensions> {
    const listener = new ReplaySubject<NbLayoutDimensions>();
    this.contentDimensionsReq$.next({ listener: listener });

    return listener.asObservable();
  }

  /**
   * @private
   * @returns {Subject<any>}
   */
  onGetDimensions(): Subject<any> {
    return this.contentDimensionsReq$;
  }
}
