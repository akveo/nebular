import { InjectionToken, Optional, Inject, Injectable } from '@angular/core';
import { NbDocument } from '../theme.options';

export type NbDirection = 'ltr' | 'rtl';

export const NB_LAYOUT_DIRECTION = new InjectionToken<NbDirection>('Layout direction');

@Injectable()
export class NbDirectionService {
  dir: NbDirection;

  constructor(
    private document: NbDocument,
    @Optional() @Inject(NB_LAYOUT_DIRECTION) dir = 'ltr',
  ) {
    this.dir = <NbDirection>dir;
    this.setDirection(<NbDirection>dir);
  }

  getDirection(): NbDirection {
    return this.dir;
  }

  setDirection(dir: NbDirection) {
    this.dir = dir;
    this.document.dir = this.dir;
  }
}
