import { NbPlacement, NbPosition, NbPositioningHelper } from './positioning.helper';

export class NbAdjustment {
  position: NbPosition;
  placement: NbPlacement;
}

export enum NbAdjustmentStrategy {
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}

/**
 * Describes the bypass order of the {@link NbPlacement} in the {@link NbAdjustmentStrategy}.
 * */
const NB_ORDERED_PLACEMENTS = {
  [NbAdjustmentStrategy.CLOCKWISE]: [
    NbPlacement.TOP,
    NbPlacement.RIGHT,
    NbPlacement.BOTTOM,
    NbPlacement.LEFT,
  ],

  [NbAdjustmentStrategy.COUNTERCLOCKWISE]: [
    NbPlacement.TOP,
    NbPlacement.LEFT,
    NbPlacement.BOTTOM,
    NbPlacement.RIGHT,
  ],
};

export class NbAdjustmentHelper {

  /**
   * Calculated {@link NbAdjustment} based on placed element, host element,
   * placed element placement and adjustment strategy.
   * */
  static adjust(placed: ClientRect, host: ClientRect, placement: NbPlacement, strategy: NbAdjustmentStrategy): NbAdjustment {
    const placements = NB_ORDERED_PLACEMENTS[strategy].slice();
    const ordered = NbAdjustmentHelper.orderPlacements(placement, placements);
    const possible = ordered.map(pl => ({
      position: NbPositioningHelper.calcPosition(placed, host, pl),
      placement: pl,
    }));

    return NbAdjustmentHelper.chooseBest(placed, possible);
  }

  /**
   * Searches first adjustment which doesn't go beyond.
   * */
  private static chooseBest(placed: ClientRect, possible: NbAdjustment[]): NbAdjustment {
    return possible.find(adjust => NbAdjustmentHelper.inViewPort(placed, adjust)) || possible.shift();
  }

  /**
   * Finds out is adjustment doesn't go beyond.
   * */
  private static inViewPort(placed: ClientRect, adjustment: NbAdjustment): boolean {
    return adjustment.position.top - window.pageYOffset > 0 && adjustment.position.left - window.pageXOffset > 0 &&
      adjustment.position.top + placed.height < window.innerHeight + window.pageYOffset &&
      adjustment.position.left + placed.width < window.innerWidth + window.pageXOffset;
  }

  /**
   * Loop placements list to make this.placement start point.
   * */
  private static orderPlacements(placement: NbPlacement, placements: NbPlacement[]): NbPlacement[] {
    const index = placements.indexOf(placement);
    const start = placements.splice(index, placements.length);
    return start.concat(...placements);
  }
}
