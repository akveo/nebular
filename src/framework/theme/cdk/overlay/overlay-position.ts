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
import { NbViewportRulerAdapter } from '../adapter/viewport-ruler-adapter';


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

const POSITIONS = {
  [NbPosition.RIGHT](offset) {
    return { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset };
  },
  [NbPosition.BOTTOM](offset) {
    return { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset };
  },
  [NbPosition.LEFT](offset) {
    return { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset };
  },
  [NbPosition.TOP](offset) {
    return { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset };
  },
};

const COUNTER_CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.LEFT, NbPosition.BOTTOM, NbPosition.RIGHT];
const NOOP_POSITIONS = [NbPosition.TOP, NbPosition.BOTTOM, NbPosition.LEFT, NbPosition.RIGHT];
const CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.RIGHT, NbPosition.BOTTOM, NbPosition.LEFT];


/**
 * Angular cdk flexible connected position strategy is not enough for our purposes.
 * So, we have custom connected position strategy that can adjust overlay over the host element automatically.
 * */
export class NbAdjustableConnectedPositionStrategy
  extends NbFlexibleConnectedPositionStrategy implements NbPositionStrategy {

  readonly positionChange: Observable<NbPosition> = this.positionChanges.pipe(
    map((positionChange: NbConnectedOverlayPositionChange) => positionChange.connectionPair),
    map((connectionPair: NbConnectionPositionPair) => {
      return Object.entries(this.connectedPositions)
        .filter(([name, position]) => position === connectionPair)
        .map(([name]) => name as NbPosition)[0];
    }),
  );

  protected _position: NbPosition;
  protected _offset: number = 15;
  protected connectedPositions: { [key: string]: NbConnectedPosition };

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
    this.applyPositions(positions);
    return this;
  }

  offset(offset: number): this {
    this._offset = offset;
    return this;
  }

  protected applyPositions(positions: NbPosition[]) {
    this.connectedPositions = positions.reduce<{ [key: string]: NbConnectedPosition }>((acc, position) => {
      acc[position] = POSITIONS[position](this._offset);
      return acc;
    }, {});
    this.withPositions(positions.map(position => this.connectedPositions[position]));
  }

  protected reorderPreferredPositions(positions: NbPosition[]): NbPosition[] {
    const cpy = positions.slice();
    const startIndex = positions.indexOf(this._position);
    const start = cpy.splice(startIndex);
    return start.concat(...cpy);
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
