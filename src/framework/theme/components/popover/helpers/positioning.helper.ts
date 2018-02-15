/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbPopoverPlacement } from './model';

export class NbPositioningHelper {

  /**
   * Describes height of the popover arrow.
   * */
  private static ARROW_SIZE: number = 10;

  /**
   * Contains position calculators for all {@link NbPopoverPlacement}
   * */
  private static positionCalculator = {
    [NbPopoverPlacement.TOP](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top - positioned.height - NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPopoverPlacement.BOTTOM](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height + NbPositioningHelper.ARROW_SIZE,
        left: host.left + host.width / 2 - positioned.width / 2,
      }
    },

    [NbPopoverPlacement.LEFT](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left - positioned.width - NbPositioningHelper.ARROW_SIZE,
      }
    },

    [NbPopoverPlacement.RIGHT](positioned: ClientRect, host: ClientRect): { top: number, left: number } {
      return {
        top: host.top + host.height / 2 - positioned.height / 2,
        left: host.left + host.width + NbPositioningHelper.ARROW_SIZE,
      }
    },
  };

  /**
   * Calculates position of the element relatively to the host element based on the placement.
   * */
  static calcPosition(positioned: ClientRect,
                      host: ClientRect,
                      placement: NbPopoverPlacement): { top: number, left: number } {
    const positionCalculator: Function = NbPositioningHelper.positionCalculator[placement];
    const position = positionCalculator.call(NbPositioningHelper.positionCalculator, positioned, host);

    position.top += window.pageYOffset;
    position.left += window.pageXOffset;

    return position;
  }
}
