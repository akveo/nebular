import { Injectable, NgZone } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { NbPlatform } from '../mapping';
import { NbLayoutRulerService } from '../../services/ruler.service';
import { NbLayoutScrollService, NbScrollPosition } from '../../services/scroll.service';


@Injectable()
export class NbViewportRulerAdapter extends ViewportRuler {
  constructor(_platform: NbPlatform, ngZone: NgZone,
              protected ruler: NbLayoutRulerService,
              protected scroll: NbLayoutScrollService) {
    super(_platform, ngZone);
  }

  getViewportSize(): Readonly<{ width: number; height: number; }> {
    let res;
    this.ruler.getDimensions()
      .pipe(map(dimensions => ({ width: dimensions.clientWidth, height: dimensions.clientHeight })))
      .subscribe(rect => res = rect);
    return res;
  }

  getViewportScrollPosition(): { left: number; top: number } {
    let res;
    this.scroll.getPosition()
      .pipe(map((position: NbScrollPosition) => ({ top: position.y, left: position.x })))
      .subscribe(position => res = position);
    return res;
  }
}
