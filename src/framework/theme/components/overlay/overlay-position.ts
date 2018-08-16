import { ElementRef, Inject, Injectable } from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  OverlayPositionBuilder,
  PositionStrategy,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

import { NB_DOCUMENT } from '../../theme.options';


export enum NbAdjustment {
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}

export enum NbPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  START = 'start',
  END = 'end',
}

export type NbPositionStrategy = PositionStrategy;

const right: ConnectedPosition = {
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center',
  offsetX: 15,
};

const bottom: ConnectedPosition = {
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
  offsetY: 15,
};

const left: ConnectedPosition = {
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center',
  offsetX: -15,
};

const top: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  offsetY: -15,
};

const FLEXIBLE_CONNECTED_POSITIONS = [
  left,
  right,
  bottom,
  top,
];

class NbAdjustableConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {
  private _position: NbPosition;
  private _adjustment: NbAdjustment;
  private _offset: number;

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  adjustment(adjustment: NbAdjustment): this {
    // TODO reorder and apply adjustment
    this._adjustment = adjustment;
    return this;
  }

  offset(offset: number): this {
    this._offset = offset;
    return this;
  }
}

@Injectable()
export class NbPositionBuilderService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected viewportRuler: ViewportRuler,
              protected platform: Platform,
              protected positionBuilder: OverlayPositionBuilder) {
  }

  global(): GlobalPositionStrategy {
    return this.positionBuilder.global();
  }

  connectedTo(elementRef: ElementRef): NbAdjustableConnectedPositionStrategy {
    return new NbAdjustableConnectedPositionStrategy(elementRef, this.viewportRuler, this.document, this.platform)
  }
}
