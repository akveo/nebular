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
    @Optional() @Inject(NB_LAYOUT_DIRECTION) private direction = NbLayoutDirection.LTR,
  ) {
    this.setDirection(direction);
  }

  /**
   * Returns true if layout direction set to left to right.
   * @returns boolean.
   * */
  public get isLtr(): boolean {
    return this.direction === NbLayoutDirection.LTR;
  }

  /**
   * Returns true if layout direction set to right to left.
   * @returns boolean.
   * */
  public get isRtl(): boolean {
    return this.direction === NbLayoutDirection.RTL;
  }

  /**
   * Returns current layout direction.
   * @returns NbLayoutDirection.
   * */
  getDirection(): NbLayoutDirection {
    return this.direction;
  }

  /**
   * Sets layout direction.
   * @param direction {NbLayoutDirection} direction to set.
   * */
  setDirection(direction: NbLayoutDirection) {
    this.direction = direction;
    this.document.dir = direction;
  }
}
