import { InjectionToken, Optional, Inject, Injectable } from '@angular/core';
import { NbDocument } from '../theme.options';

export enum NbLayoutDirection {
  LTR = 'ltr',
  RTL = 'rtl',
};

export const NB_LAYOUT_DIRECTION = new InjectionToken<NbLayoutDirection>('Layout direction');

@Injectable()
export class NbLayoutDirectionService {
  private dir: NbLayoutDirection;

  constructor(
    private document: NbDocument,
    @Optional() @Inject(NB_LAYOUT_DIRECTION) dir = NbLayoutDirection.LTR,
  ) {
    this.dir = dir;
    this.setDirection(<NbLayoutDirection>dir);
  }

  public get isLtr() {
    return this.dir === NbLayoutDirection.LTR;
  }

  public get isRtl() {
    return this.dir === NbLayoutDirection.RTL;
  }

  getDirection(): NbLayoutDirection {
    return this.dir;
  }

  setDirection(dir: NbLayoutDirection) {
    this.dir = dir;
    this.document.dir = this.dir;
  }
}
