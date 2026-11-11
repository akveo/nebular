import { Injectable } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { NbLayoutRulerService } from '../../../services/ruler.service';
import { NbLayoutScrollService, NbScrollPosition } from '../../../services/scroll.service';

@Injectable()
export class NbViewportRulerAdapter extends ViewportRuler {
  constructor(protected ruler: NbLayoutRulerService, protected scroll: NbLayoutScrollService) {
    super();
  }

  getViewportSize(): Readonly<{ width: number; height: number }> {
    let res = super.getViewportSize();
    /*
     * getDimensions call is really synchronous operation.
     * And we have to conform with the interface of the original service.
     * */
    const subscription = this.ruler
      .getDimensions()
      .pipe(map((dimensions) => ({ width: dimensions.clientWidth, height: dimensions.clientHeight })))
      .subscribe((rect) => (res = rect));
    subscription.unsubscribe();
    return res;
  }

  getViewportScrollPosition(): { left: number; top: number } {
    let res = super.getViewportScrollPosition();
    /*
     * getPosition call is really synchronous operation.
     * And we have to conform with the interface of the original service.
     * */
    const subscription = this.scroll
      .getPosition()
      .pipe(map((position: NbScrollPosition) => ({ top: position.y, left: position.x })))
      .subscribe((position) => (res = position));
    subscription.unsubscribe();
    return res;
  }
}
