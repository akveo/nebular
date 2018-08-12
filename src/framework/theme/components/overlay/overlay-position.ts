import { ElementRef, Inject, Injectable } from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
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
  offsetX: -15,
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
  offsetX: 15,
};

const FLEXIBLE_CONNECTED_POSITIONS = [
  right,
  bottom,
  left,
  top,
];

class NbAdjustableConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {
  private _position: NbPosition;

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  adjustment(adjustment: NbAdjustment): this {
    // TODO reorder and apply adjustment
    return this;
  }

  // clockwise(): this {
  //   this.withPositions([top, right, bottom, left]);
  //   return this;
  // }
  //
  // counterClockwise(): this {
  //   this.withPositions([top, left, bottom, right]);
  //   return this;
  // }
}

@Injectable()
export class NbPositionFactoryService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected viewportRuler: ViewportRuler,
              protected platform: Platform,
              protected positionBuilder: OverlayPositionBuilder) {
  }

  createPosition(position: NbPosition, adjustment: NbAdjustment,
                 connectedTo: ElementRef, offset: number): NbPositionStrategy {
    switch (adjustment) {
      case NbAdjustment.CLOCKWISE:
        return new NbAdjustableConnectedPositionStrategy(connectedTo, this.viewportRuler, this.document, this.platform)
          .withPositions(FLEXIBLE_CONNECTED_POSITIONS);
      case NbAdjustment.COUNTERCLOCKWISE:
        return new NbAdjustableConnectedPositionStrategy(connectedTo, this.viewportRuler, this.document, this.platform)
          .withPositions(FLEXIBLE_CONNECTED_POSITIONS);
      default:
        return this.positionBuilder.flexibleConnectedTo(connectedTo);
    }
  }
}

// TODO track scroll
@Injectable()
export class NbPositionBuilderService {
  private _position: NbPosition;
  private _adjustment: NbAdjustment;
  private _connectedTo: ElementRef;
  private _offset: number;

  constructor(protected positionFactory: NbPositionFactoryService) {
  }

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  adjustment(adjustment: NbAdjustment): this {
    this._adjustment = adjustment;
    return this;
  }

  connectedTo(elementRef: ElementRef): this {
    this._connectedTo = elementRef;
    return this;
  }

  hostOffset(offset: number): this {
    this._offset = offset;
    return this;
  }

  build(): NbPositionStrategy {
    return this.positionFactory.createPosition(this._position, this._adjustment, this._connectedTo, this._offset);
  }
}
