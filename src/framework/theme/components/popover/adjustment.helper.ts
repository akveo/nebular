import { NbPlacement, NbPositioningHelper } from './positioning.helper';

export class NbPosition {
  placement: NbPlacement;
  position: {
    top: number;
    left: number;
  };
}

/**
 * Adjustment strategies.
 * */
export enum NbAdjustment {
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}

/**
 * Describes the bypass order of the {@link NbPlacement} in the {@link NbAdjustment}.
 * */
const NB_ORDERED_PLACEMENTS = {
  [NbAdjustment.CLOCKWISE]: [
    NbPlacement.TOP,
    NbPlacement.RIGHT,
    NbPlacement.BOTTOM,
    NbPlacement.LEFT,
  ],

  [NbAdjustment.COUNTERCLOCKWISE]: [
    NbPlacement.TOP,
    NbPlacement.LEFT,
    NbPlacement.BOTTOM,
    NbPlacement.RIGHT,
  ],
};

export class NbAdjustmentHelper {

  /**
   * Calculated {@link NbPosition} based on placed element, host element,
   * placed element placement and adjustment strategy.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param host {ClientRect} host element.
   * @param placement {NbPlacement} placed element placement relatively host.
   * @param adjustment {NbAdjustment} adjustment strategy.
   *
   * @return {NbPosition} calculated position.
   * */
  static adjust(placed: ClientRect, host: ClientRect, placement: NbPlacement, adjustment: NbAdjustment): NbPosition {
    const placements = NB_ORDERED_PLACEMENTS[adjustment].slice();
    const ordered = NbAdjustmentHelper.orderPlacements(placement, placements);
    const possible = ordered.map(pl => ({
      position: NbPositioningHelper.calcPosition(placed, host, pl),
      placement: pl,
    }));

    return NbAdjustmentHelper.chooseBest(placed, possible);
  }

  /**
   * Searches first adjustment which doesn't go beyond the viewport.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param possible {NbPosition[]} possible positions list ordered according to adjustment strategy.
   *
   * @return {NbPosition} calculated position.
   * */
  private static chooseBest(placed: ClientRect, possible: NbPosition[]): NbPosition {
    return possible.find(adjust => NbAdjustmentHelper.inViewPort(placed, adjust)) || possible.shift();
  }

  /**
   * Finds out is adjustment doesn't go beyond of the view port.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param position {NbPosition} position of the placed element.
   *
   * @return {boolean} true if placed element completely viewport.
   * */
  private static inViewPort(placed: ClientRect, position: NbPosition): boolean {
    return position.position.top - window.pageYOffset > 0 &&
      position.position.left - window.pageXOffset > 0 &&
      position.position.top + placed.height < window.innerHeight + window.pageYOffset &&
      position.position.left + placed.width < window.innerWidth + window.pageXOffset;
  }

  /**
   * Reorder placements list to make placement start point and fit {@link NbAdjustment}
   *
   * @param placement {NbPlacement} active placement
   * @param placements {NbPlacement[]} placements list according to the active adjustment strategy.
   *
   * @return {NbPlacement[]} correctly ordered placements list.
   *
   * @example order placements for {@link NbPlacement#RIGHT} and {@link NbAdjustment#CLOCKWISE}
   * ```
   * const placements = NB_ORDERED_PLACEMENTS[NbAdjustment.CLOCKWISE];
   * const ordered = orderPlacement(NbPlacement.RIGHT, placements);
   *
   * expect(ordered).toEqual([
   *  NbPlacement.RIGHT,
   *  NbPlacement.BOTTOM,
   *  NbPlacement.LEFT,
   *  NbPlacement.TOP,
   * ]);
   * ```
   * */
  private static orderPlacements(placement: NbPlacement, placements: NbPlacement[]): NbPlacement[] {
    const index = placements.indexOf(placement);
    const start = placements.splice(index, placements.length);
    return start.concat(...placements);
  }
}
