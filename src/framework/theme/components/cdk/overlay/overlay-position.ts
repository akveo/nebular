import { ElementRef, Inject, Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NB_DOCUMENT } from '../../../theme.options';
import {
  NbConnectedOverlayPositionChange,
  NbConnectedPosition,
  NbConnectionPositionPair,
  NbFlexibleConnectedPositionStrategy,
  NbOverlayPositionBuilder,
  NbOverlayRef,
  NbPlatform,
  NbPositionStrategy,
} from './mapping';
import { NbOverlayContainerAdapter } from '../adapter/overlay-container-adapter';
import { NbViewportRulerAdapter } from '../adapter/viewport-ruler-adapter';
import { NbGlobalLogicalPosition } from './position-helper';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';


export enum NbAdjustment {
  NOOP = 'noop',
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum NbPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  START = 'start',
  END = 'end',
  TOP_END = 'top-end',
  TOP_START = 'top-start',
  BOTTOM_END = 'bottom-end',
  BOTTOM_START = 'bottom-start',
  END_TOP = 'end-top',
  END_BOTTOM = 'end-bottom',
  START_TOP = 'start-top',
  START_BOTTOM = 'start-bottom',
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
  [NbPosition.START](offset) {
    return this[NbPosition.LEFT](offset);
  },
  [NbPosition.END](offset) {
    return this[NbPosition.RIGHT](offset);
  },
  [NbPosition.END_TOP](offset) {
    return { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: offset };
  },
  [NbPosition.END_BOTTOM](offset) {
    return { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: offset };
  },
  [NbPosition.BOTTOM_START](offset) {
    return { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: offset };
  },
  [NbPosition.BOTTOM_END](offset) {
    return { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offset };
  },
  [NbPosition.START_TOP](offset) {
    return { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -offset };
  },
  [NbPosition.START_BOTTOM](offset) {
    return { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -offset };
  },
  [NbPosition.TOP_START](offset) {
    return { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -offset };
  },
  [NbPosition.TOP_END](offset) {
    return { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -offset };
  },
};

const COUNTER_CLOCKWISE_POSITIONS = [
  NbPosition.TOP,
  NbPosition.TOP_END,
  NbPosition.TOP_START,
  NbPosition.START,
  NbPosition.START_TOP,
  NbPosition.START_BOTTOM,
  NbPosition.BOTTOM,
  NbPosition.BOTTOM_START,
  NbPosition.BOTTOM_END,
  NbPosition.END,
  NbPosition.END_BOTTOM,
  NbPosition.END_TOP,
];
const CLOCKWISE_POSITIONS = [
  NbPosition.TOP,
  NbPosition.TOP_START,
  NbPosition.TOP_END,
  NbPosition.END,
  NbPosition.END_TOP,
  NbPosition.END_BOTTOM,
  NbPosition.BOTTOM,
  NbPosition.BOTTOM_END,
  NbPosition.BOTTOM_START,
  NbPosition.START,
  NbPosition.START_BOTTOM,
  NbPosition.START_TOP,
];
const VERTICAL_POSITIONS = [NbPosition.BOTTOM, NbPosition.TOP];
const HORIZONTAL_POSITIONS = [NbPosition.START, NbPosition.END];


function comparePositions(p1: NbConnectedPosition, p2: NbConnectedPosition): boolean {
  return p1.originX === p2.originX
    && p1.originY === p2.originY
    && p1.overlayX === p2.overlayX
    && p1.overlayY === p2.overlayY;
}

/**
 * The main idea of the adjustable connected strategy is to provide predefined set of positions for your overlay.
 * You have to provide adjustment and appropriate strategy will be chosen in runtime.
 * */
export class NbAdjustableConnectedPositionStrategy
  extends NbFlexibleConnectedPositionStrategy implements NbPositionStrategy {

  protected _position: NbPosition;
  protected _offset: number = 15;
  protected _adjustment: NbAdjustment;

  protected appliedPositions: { key: NbPosition, connectedPosition: NbConnectedPosition }[];

  readonly positionChange: Observable<NbPosition> = this.positionChanges.pipe(
    map((positionChange: NbConnectedOverlayPositionChange) => positionChange.connectionPair),
    map((connectionPair: NbConnectionPositionPair) => {
      return this.appliedPositions.find(({ connectedPosition }) => {
        return comparePositions(connectedPosition, connectionPair);
      }).key;
    }),
  );

  attach(overlayRef: NbOverlayRef) {
    /**
     * We have to apply positions before attach because super.attach() validates positions and crashes app
     * if no positions provided.
     * */
    this.applyPositions();
    super.attach(overlayRef);
  }

  apply() {
    this.applyPositions();
    super.apply();
  }

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  adjustment(adjustment: NbAdjustment): this {
    this._adjustment = adjustment;
    return this;
  }

  offset(offset: number): this {
    this._offset = offset;
    return this;
  }

  protected applyPositions() {
    const positions: NbPosition[] = this.createPositions();
    this.persistChosenPositions(positions);
    this.withPositions(this.appliedPositions.map(({ connectedPosition }) => connectedPosition));
  }

  protected createPositions(): NbPosition[] {
    switch (this._adjustment) {
      case NbAdjustment.NOOP:
        return [ this._position ];
      case NbAdjustment.CLOCKWISE:
        return this.reorderPreferredPositions(CLOCKWISE_POSITIONS);
      case NbAdjustment.COUNTERCLOCKWISE:
        return this.reorderPreferredPositions(COUNTER_CLOCKWISE_POSITIONS);
      case NbAdjustment.HORIZONTAL:
        return this.reorderPreferredPositions(HORIZONTAL_POSITIONS);
      case NbAdjustment.VERTICAL:
        return this.reorderPreferredPositions(VERTICAL_POSITIONS);
    }
  }

  protected persistChosenPositions(positions: NbPosition[]) {
    this.appliedPositions = positions.map(position => ({
      key: position,
      connectedPosition: POSITIONS[position](this._offset),
    }));
  }

  protected reorderPreferredPositions(positions: NbPosition[]): NbPosition[] {
    // Physical positions should be mapped to logical as adjustments use logical positions.
    const startPositionIndex = positions.indexOf(this.mapToLogicalPosition(this._position));
    const firstPart = positions.slice(startPositionIndex);
    const secondPart = positions.slice(0, startPositionIndex);
    return firstPart.concat(secondPart);
  }

  protected mapToLogicalPosition(position: NbPosition): NbPosition {
    if (position === NbPosition.LEFT) {
      return NbPosition.START;
    }
    if (position === NbPosition.RIGHT) {
      return NbPosition.END;
    }

    return position;
  }
}

export class NbGlobalPositionStrategy extends GlobalPositionStrategy {

  position(position: NbGlobalLogicalPosition): this {
    switch (position) {
      case NbGlobalLogicalPosition.TOP_START:
        return this.top().left();

      case NbGlobalLogicalPosition.TOP_END:
        return this.top().right();

      case NbGlobalLogicalPosition.BOTTOM_START:
        return this.bottom().left();

      case NbGlobalLogicalPosition.BOTTOM_END:
        return this.bottom().right();
    }
  }
}

@Injectable()
export class NbPositionBuilderService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected viewportRuler: NbViewportRulerAdapter,
              protected platform: NbPlatform,
              protected positionBuilder: NbOverlayPositionBuilder,
              protected overlayContainer: NbOverlayContainerAdapter) {
  }

  global(): NbGlobalPositionStrategy {
    return new NbGlobalPositionStrategy();
  }

  connectedTo(elementRef: ElementRef): NbAdjustableConnectedPositionStrategy {
    return new NbAdjustableConnectedPositionStrategy(
      elementRef,
      this.viewportRuler,
      this.document,
      this.platform,
      this.overlayContainer,
    )
      .withFlexibleDimensions(false)
      .withPush(false);
  }
}
