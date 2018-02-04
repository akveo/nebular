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

export class NbPositioningHelper {

  /**
   * Describes height of the popover arrow.
   * */
  private static ARROW_SIZE: number = 10;

  /**
   * Contains position calculators for all {@link NbPlacement}
   * */
  private static positionCalculator = {
    [NbPlacement.TOP](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top - positioned.height - NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPlacement.BOTTOM](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height + NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPlacement.LEFT](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left - positioned.width - NbPositioningHelper.ARROW_SIZE,
      }
    },

    [NbPlacement.RIGHT](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left + host.width + NbPositioningHelper.ARROW_SIZE,
      }
    },
  };

  /**
   * Calculates position of the element relatively to the host element based on the placement.
   * */
  static calcPosition(positioned: ClientRect, host: ClientRect, placement: NbPlacement): { top: number, left: number } {
    const positionCalculator: Function = NbPositioningHelper.positionCalculator[placement];
    const position = positionCalculator.call(NbPositioningHelper.positionCalculator, positioned, host);

    position.top += window.pageYOffset;
    position.left += window.pageXOffset;

    return position;
  }
}
