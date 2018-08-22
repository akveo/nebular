import { Injectable } from '@angular/core';

import { NbGlobalPositionStrategy, NbPositionBuilderService } from '../../cdk';
import { NbToastPosition } from './model';


export const NB_TOAST_TOP_POSITIONS = [
  NbToastPosition.TOP_RIGHT,
  NbToastPosition.TOP_LEFT,
  NbToastPosition.TOP_END,
  NbToastPosition.TOP_START,
];

export const NB_TOAST_RIGHT_POSITIONS = [
  NbToastPosition.TOP_RIGHT,
  NbToastPosition.BOTTOM_RIGHT,
  NbToastPosition.TOP_END,
  NbToastPosition.BOTTOM_END,
];


@Injectable()
export class NbToastPositionFactory {
  constructor(protected positionBuilder: NbPositionBuilderService) {
  }

  create(position: NbToastPosition): NbGlobalPositionStrategy {
    const positionStrategy = this.positionBuilder.global();

    switch (position) {
      case NbToastPosition.TOP_START:
        return positionStrategy
          .top()
          .left();

      case NbToastPosition.TOP_END:
        return positionStrategy
          .top()
          .right();

      case NbToastPosition.TOP_LEFT:
        return positionStrategy
          .top()
          .left();

      case NbToastPosition.TOP_RIGHT:
        return positionStrategy
          .top()
          .right();

      case NbToastPosition.BOTTOM_START:
        return positionStrategy
          .bottom()
          .left();

      case NbToastPosition.BOTTOM_END:
        return positionStrategy
          .bottom()
          .right();

      case NbToastPosition.BOTTOM_LEFT:
        return positionStrategy
          .bottom()
          .left();

      case NbToastPosition.BOTTOM_RIGHT:
        return positionStrategy
          .bottom()
          .right();
    }
  }
}

