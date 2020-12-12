import { Inject, Injectable, NgZone } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { NbPlatform } from '../platform/platform-service';
import { NbLayoutRulerService } from '../../../services/ruler.service';
import { NbLayoutScrollService, NbScrollPosition } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';


@Injectable()
export class NbViewportRulerAdapter extends ViewportRuler {
  constructor(platform: NbPlatform, ngZone: NgZone,
              protected ruler: NbLayoutRulerService,
              protected scroll: NbLayoutScrollService,
              @Inject(NB_DOCUMENT) document: any) {
    super(platform, ngZone, document);
  }

  getViewportSize(): Readonly<{ width: number; height: number; }> {
    let res;
    /*
    * getDimensions call is really synchronous operation.
    * And we have to conform with the interface of the original service.
    * */
    this.ruler.getDimensions()
      .pipe(map(dimensions => ({ width: dimensions.clientWidth, height: dimensions.clientHeight })))
      .subscribe(rect => res = rect);
    return res;
  }

  getViewportScrollPosition(): { left: number; top: number } {
    let res;
    /*
    * getPosition call is really synchronous operation.
    * And we have to conform with the interface of the original service.
    * */
    this.scroll.getPosition()
      .pipe(map((position: NbScrollPosition) => ({ top: position.y, left: position.x })))
      .subscribe(position => res = position);
    return res;
  }
}
