import { ElementRef, Inject, Injectable } from '@angular/core';
import {
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  OverlayPositionBuilder,
  PositionStrategy,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NB_DOCUMENT } from '../../theme.options';


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

export type NbPositionStrategy = PositionStrategy & {
  positionChange: Observable<NbPosition>;
};


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

const POSITIONS = {
  [NbPosition.TOP]: top,
  [NbPosition.BOTTOM]: bottom,
  [NbPosition.LEFT]: left,
  [NbPosition.RIGHT]: right,
};

const COUNTER_CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.LEFT, NbPosition.BOTTOM, NbPosition.RIGHT];
const NOOP_POSITIONS = [NbPosition.TOP, NbPosition.BOTTOM, NbPosition.LEFT, NbPosition.RIGHT];
const CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.RIGHT, NbPosition.BOTTOM, NbPosition.LEFT];


class NbAdjustableConnectedPositionStrategy extends FlexibleConnectedPositionStrategy implements NbPositionStrategy {
  readonly positionChange: Observable<NbPosition> = this.positionChanges.pipe(
    map((positionChange: ConnectedOverlayPositionChange) => positionChange.connectionPair),
    map((connectionPair: ConnectionPositionPair) => {
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
