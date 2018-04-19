import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent as observableFromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { NB_WINDOW } from '@nebular/theme';

@Injectable()
export class IframeCommunicatorService {

  constructor(@Inject(NB_WINDOW) private window) {
  }

  public send(payload: any, target: Window = this.window.parent) {
    target.postMessage(payload, '*');
  }

  public receive(id: string): Observable<any> {
    return observableFromEvent(this.window, 'message')
      .pipe(
        filter((msg: any) => msg.data && msg.data.id === id),
        map((msg: any) => msg.data),
      );
  }
}
