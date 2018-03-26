import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent as observableFromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';

@Injectable()
export class IframeCommunicatorService {

  public send(payload: any, target: Window = window.parent) {
    target.postMessage(payload, '*');
  }

  public receive(id: string): Observable<any> {
    return observableFromEvent(window, 'message')
      .pipe(
        filter((msg: any) => msg.data && msg.data.id === id),
        map((msg: any) => msg.data),
      );
  }
}
