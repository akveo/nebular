/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Arrangement of one element relative to another.
 * */
export enum NbPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Point on the screen which can be described with two coordinates.
 * */
export class NbPosition {
  top: number;
  left: number;
}

export class NbPositioningHelper {

  /**
   * Describes height of the popover arrow.
   * */
  private static ARROW_SIZE: number = 10;

  private static positionCalculator = {
    [NbPlacement.TOP](positioned: ClientRect, host: ClientRect): NbPosition {
      return {
        top: host.top - positioned.height - NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPlacement.BOTTOM](positioned: ClientRect, host: ClientRect): NbPosition {
      return {
        top: host.top + host.height + NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPlacement.LEFT](positioned: ClientRect, host: ClientRect): NbPosition {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left - positioned.width - NbPositioningHelper.ARROW_SIZE,
      }
    },

    [NbPlacement.RIGHT](positioned: ClientRect, host: ClientRect): NbPosition {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left + host.width + NbPositioningHelper.ARROW_SIZE,
      }
    },
  };

  /**
   * We're calculating adjustment based on the view port to provide better user experience.
   * */
  private static adjustmentCalculator = {

    /**
     * {@link NbPlacement.TOP} adjustment.
     * Tries to save top placement.
     * If can't - place element to the bottom relatively the host.
     * */
    [NbPlacement.TOP](positioned: ClientRect, host: ClientRect): NbPlacement {
      const top = host.top - positioned.height - NbPositioningHelper.ARROW_SIZE;

      if (top > 0) {
        return NbPlacement.TOP;
      }

      return NbPlacement.BOTTOM;
    },

    /**
     * {@link NbPlacement.BOTTOM} adjustment.
     * Tries to save bottom placement.
     * If can't - place element to the top relatively the host.
     * */
    [NbPlacement.BOTTOM](positioned: ClientRect, host: ClientRect): NbPlacement {
      const bottom = host.bottom + positioned.height + NbPositioningHelper.ARROW_SIZE;

      if (bottom < window.innerHeight) {
        return NbPlacement.BOTTOM;
      }

      return NbPlacement.TOP;
    },

    /**
     * {@link NbPlacement.LEFT} adjustment.
     * Tries to save left placement.
     * If can't - choose between top and bottom positions choosing the one that fits best on the screen.
     * */
    [NbPlacement.LEFT](positioned: ClientRect, host: ClientRect): NbPlacement {
      const left = host.left - positioned.width - NbPositioningHelper.ARROW_SIZE;

      if (left > 0) {
        return NbPlacement.LEFT;
      }

      return NbPositioningHelper.adjust(positioned, host, NbPlacement.BOTTOM);
    },

    /**
     * {@link NbPlacement.RIGHT} adjustment.
     * Tries to save right placement.
     * If can't - choose between top and bottom positions choosing the one that fits best on the screen.
     * */
    [NbPlacement.RIGHT](positioned: ClientRect, host: ClientRect): NbPlacement {
      const right = host.right + positioned.width + NbPositioningHelper.ARROW_SIZE;

      if (right < window.innerWidth) {
        return NbPlacement.RIGHT;
      }

      return NbPositioningHelper.adjust(positioned, host, NbPlacement.BOTTOM);
    },
  };

  /**
   * Calculates position of the element relatively to the host element based on the placement.
   * */
  static calculatePosition(positioned: ClientRect, host: ClientRect, placement: NbPlacement): NbPosition {
    const positionCalculator: Function = NbPositioningHelper.positionCalculator[placement];
    const position = positionCalculator.call(NbPositioningHelper.positionCalculator, positioned, host);

    position.top += window.pageYOffset;
    position.left += window.pageXOffset;

    return position;
  }

  static adjust(positioned: ClientRect, host: ClientRect, placement: NbPlacement): NbPlacement {
    const adjustmentCalculator: Function = NbPositioningHelper.adjustmentCalculator[placement];
    return adjustmentCalculator.call(NbPositioningHelper.adjustmentCalculator, positioned, host);
  }
}
