import { InjectionToken, Optional, Inject, Injectable } from '@angular/core';
import { NbDocument } from '../theme.options';

/**
 * Layout direction.
 * */
export enum NbLayoutDirection {
  LTR = 'ltr',
  RTL = 'rtl',
};

/**
 * Layout direction setting injection token.
 * */
export const NB_LAYOUT_DIRECTION = new InjectionToken<NbLayoutDirection>('Layout direction');

/**
 * Layout Direction Service. Allows you to listen to menu events, or to interact with a menu.
 */
@Injectable()
export class NbLayoutDirectionService {
  constructor(
    private document: NbDocument,
    @Optional() @Inject(NB_LAYOUT_DIRECTION) private dir = NbLayoutDirection.LTR,
  ) {
    this.dir = dir;
    this.setDirection(<NbLayoutDirection>dir);
  }

  /**
   * Returns true if layout direction set to left to right.
   * @returns boolean.
   * */
  public get isLtr() {
    return this.dir === NbLayoutDirection.LTR;
  }

  /**
   * Returns true if layout direction set to right to left.
   * @returns boolean.
   * */
  public get isRtl() {
    return this.dir === NbLayoutDirection.RTL;
  }

  /**
   * Returns current layout direction.
   * @returns NbLayoutDirection.
   * */
  getDirection(): NbLayoutDirection {
    return this.dir;
  }

  /**
   * Sets layout direction.
   * @param dir {NbLayoutDirection} direction to set.
   * */
  setDirection(dir: NbLayoutDirection) {
    this.dir = dir;
    this.document.dir = this.dir;
  }
}
