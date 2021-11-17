import { Injectable } from '@angular/core';

import { NbLayoutDirectionService } from '../../../services/direction.service';
import { NbPosition } from './overlay-position';
import { NbDirection } from './mapping';

export enum NbGlobalLogicalPosition {
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
}

export enum NbGlobalPhysicalPosition {
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
}

export type NbGlobalPosition = NbGlobalPhysicalPosition | NbGlobalLogicalPosition;

@Injectable()
export class NbPositionHelper {
  constructor(protected layoutDirection: NbLayoutDirectionService) {}

  toLogicalPositionByDirection(direction: NbDirection, position: NbPosition): NbPosition {
    return direction === 'ltr' ? this.toLogicalPositionWhenLtr(position) : this.toLogicalPositionWhenRtl(position);
  }

  toLogicalPosition(position: NbGlobalPosition): NbGlobalLogicalPosition {
    if (Object.values(NbGlobalLogicalPosition).includes(position as NbGlobalLogicalPosition)) {
      return position as NbGlobalLogicalPosition;
    }

    if (this.layoutDirection.isLtr()) {
      return this.toLogicalGlobalPositionWhenLtr(position as NbGlobalPhysicalPosition);
    } else {
      return this.toLogicalGlobalPositionWhenRtl(position as NbGlobalPhysicalPosition);
    }
  }

  toPhysicalPosition(position: NbGlobalPosition): NbGlobalPhysicalPosition {
    if (Object.values(NbGlobalPhysicalPosition).includes(position as NbGlobalPhysicalPosition)) {
      return position as NbGlobalPhysicalPosition;
    }

    if (this.layoutDirection.isLtr()) {
      return this.toPhysicalPositionWhenLtr(position as NbGlobalLogicalPosition);
    } else {
      return this.toPhysicalPositionWhenRtl(position as NbGlobalLogicalPosition);
    }
  }

  isTopPosition(position: NbGlobalPosition) {
    const logicalPosition = this.toLogicalPosition(position);

    return logicalPosition === NbGlobalLogicalPosition.TOP_END || logicalPosition === NbGlobalLogicalPosition.TOP_START;
  }

  isRightPosition(position: NbGlobalPosition) {
    const physicalPosition = this.toPhysicalPosition(position);

    return (
      physicalPosition === NbGlobalPhysicalPosition.TOP_RIGHT ||
      physicalPosition === NbGlobalPhysicalPosition.BOTTOM_RIGHT
    );
  }

  protected toLogicalPositionWhenLtr(position: NbPosition): NbPosition {
    if (position === NbPosition.LEFT) {
      return NbPosition.START;
    }
    if (position === NbPosition.RIGHT) {
      return NbPosition.END;
    }
    return position;
  }

  protected toLogicalPositionWhenRtl(position: NbPosition): NbPosition {
    if (position === NbPosition.LEFT) {
      return NbPosition.END;
    }
    if (position === NbPosition.RIGHT) {
      return NbPosition.START;
    }
    return position;
  }

  protected toLogicalGlobalPositionWhenLtr(position: NbGlobalPhysicalPosition): NbGlobalLogicalPosition {
    switch (position) {
      case NbGlobalPhysicalPosition.TOP_RIGHT:
        return NbGlobalLogicalPosition.TOP_END;
      case NbGlobalPhysicalPosition.TOP_LEFT:
        return NbGlobalLogicalPosition.TOP_START;
      case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
        return NbGlobalLogicalPosition.BOTTOM_END;
      case NbGlobalPhysicalPosition.BOTTOM_LEFT:
        return NbGlobalLogicalPosition.BOTTOM_START;
    }
  }

  protected toLogicalGlobalPositionWhenRtl(position: NbGlobalPhysicalPosition): NbGlobalLogicalPosition {
    switch (position) {
      case NbGlobalPhysicalPosition.TOP_RIGHT:
        return NbGlobalLogicalPosition.TOP_START;
      case NbGlobalPhysicalPosition.TOP_LEFT:
        return NbGlobalLogicalPosition.TOP_END;
      case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
        return NbGlobalLogicalPosition.BOTTOM_START;
      case NbGlobalPhysicalPosition.BOTTOM_LEFT:
        return NbGlobalLogicalPosition.BOTTOM_END;
    }
  }

  protected toPhysicalPositionWhenLtr(position: NbGlobalLogicalPosition): NbGlobalPhysicalPosition {
    switch (position) {
      case NbGlobalLogicalPosition.TOP_START:
        return NbGlobalPhysicalPosition.TOP_LEFT;
      case NbGlobalLogicalPosition.TOP_END:
        return NbGlobalPhysicalPosition.TOP_RIGHT;
      case NbGlobalLogicalPosition.BOTTOM_START:
        return NbGlobalPhysicalPosition.BOTTOM_LEFT;
      case NbGlobalLogicalPosition.BOTTOM_END:
        return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    }
  }

  protected toPhysicalPositionWhenRtl(position: NbGlobalLogicalPosition): NbGlobalPhysicalPosition {
    switch (position) {
      case NbGlobalLogicalPosition.TOP_START:
        return NbGlobalPhysicalPosition.TOP_RIGHT;
      case NbGlobalLogicalPosition.TOP_END:
        return NbGlobalPhysicalPosition.TOP_LEFT;
      case NbGlobalLogicalPosition.BOTTOM_START:
        return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
      case NbGlobalLogicalPosition.BOTTOM_END:
        return NbGlobalPhysicalPosition.BOTTOM_LEFT;
    }
  }
}
