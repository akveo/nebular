import { ElementRef, Inject, Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NB_DOCUMENT } from '../../theme.options';
import {
  NbConnectedOverlayPositionChange,
  NbConnectedPosition,
  NbConnectionPositionPair,
  NbFlexibleConnectedPositionStrategy,
  NbGlobalPositionStrategy,
  NbOverlayPositionBuilder,
  NbPlatform,
  NbPositionStrategy,
} from '../mapping';
import { NbViewportRulerAdapter } from '../adapter/index';


export enum NbAdjustment {
  NOOP = 'noop',
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

const right: NbConnectedPosition = {
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center',
  offsetX: 15,
};

const bottom: NbConnectedPosition = {
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
  offsetY: 15,
};

const left: NbConnectedPosition = {
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center',
  offsetX: -15,
};

const top: NbConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  offsetY: -15,
};

const POSITIONS = {
  [NbPosition.TOP]: top,
  [NbPosition.BOTTOM]: bottom,
  [NbPosition.LEFT]: left,
  [NbPosition.RIGHT]: right,
};

const COUNTER_CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.LEFT, NbPosition.BOTTOM, NbPosition.RIGHT];
const NOOP_POSITIONS = [NbPosition.TOP, NbPosition.BOTTOM, NbPosition.LEFT, NbPosition.RIGHT];
const CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.RIGHT, NbPosition.BOTTOM, NbPosition.LEFT];


export class NbAdjustableConnectedPositionStrategy
  extends NbFlexibleConnectedPositionStrategy implements NbPositionStrategy {

  readonly positionChange: Observable<NbPosition> = this.positionChanges.pipe(
    map((positionChange: NbConnectedOverlayPositionChange) => positionChange.connectionPair),
    map((connectionPair: NbConnectionPositionPair) => {
      return Object.entries(POSITIONS)
        .filter(([name, position]) => position === connectionPair)
        .map(([name]) => name as NbPosition)[0];
    }),
  );

  private _position: NbPosition;

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  // TODO have to be applied after position
  adjustment(adjustment: NbAdjustment): this {
    let positions: NbPosition[];
    switch (adjustment) {
      case NbAdjustment.NOOP:
        positions = NOOP_POSITIONS.filter(position => this._position === position);
        break;
      case NbAdjustment.CLOCKWISE:
        positions = this.reorderPreferredPositions(CLOCKWISE_POSITIONS);
        break;
      case NbAdjustment.COUNTERCLOCKWISE:
        positions = this.reorderPreferredPositions(COUNTER_CLOCKWISE_POSITIONS);
        break
    }
    this.withPositions(positions.map(position => POSITIONS[position]));
    return this;
  }

  // TODO APPLY
  offset(offset: number): this {
    return this;
  }

  protected reorderPreferredPositions(positions: NbPosition[]): NbPosition[] {
    const startIndex = positions.indexOf(this._position);
    const start = positions.slice().splice(startIndex);
    return start.concat(...positions);
  }
}

@Injectable()
export class NbPositionBuilderService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected viewportRuler: NbViewportRulerAdapter,
              protected platform: NbPlatform,
              protected positionBuilder: NbOverlayPositionBuilder) {
  }

  global(): NbGlobalPositionStrategy {
    return this.positionBuilder.global();
  }

  connectedTo(elementRef: ElementRef): NbAdjustableConnectedPositionStrategy {
    return new NbAdjustableConnectedPositionStrategy(elementRef, this.viewportRuler, this.document, this.platform)
      .withFlexibleDimensions(false)
      .withPush(false);
  }
}
