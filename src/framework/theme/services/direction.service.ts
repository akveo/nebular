import { InjectionToken, Optional, Inject, Injectable } from '@angular/core';
import { NbDocument } from '../theme.options';

export type Direction = 'ltr' | 'rtl';

export const LAYOUT_DIRECTION = new InjectionToken<Direction>('Flow direction');

@Injectable()
export class NbDirectionService {
  constructor(
    private document: NbDocument,
    @Optional() @Inject(LAYOUT_DIRECTION) private dir: Direction = 'ltr',
  ) {
    this.setDirection(dir);
  }

  getDirection(): Direction {
    return this.dir;
  }

  setDirection(dir: Direction) {
    this.dir = dir;
    this.document.dir = this.dir;
  }
}
