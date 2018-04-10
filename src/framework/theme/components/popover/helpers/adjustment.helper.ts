import { Injectable, Inject } from '@angular/core';

import { NB_WINDOW } from '../../../theme.options';
import { NbPositioningHelper } from './positioning.helper';
import { NbPopoverAdjustment, NbPopoverPlacement, NbPopoverPosition } from './model';

/**
 * Describes the bypass order of the {@link NbPopoverPlacement} in the {@link NbPopoverAdjustment}.
 * */
const NB_ORDERED_PLACEMENTS = {
  [NbPopoverAdjustment.CLOCKWISE]: [
    NbPopoverPlacement.TOP,
    NbPopoverPlacement.RIGHT,
    NbPopoverPlacement.BOTTOM,
    NbPopoverPlacement.LEFT,
  ],

  [NbPopoverAdjustment.COUNTERCLOCKWISE]: [
    NbPopoverPlacement.TOP,
    NbPopoverPlacement.LEFT,
    NbPopoverPlacement.BOTTOM,
    NbPopoverPlacement.RIGHT,
  ],
};

@Injectable()
export class NbAdjustmentHelper {

  private window: Window;

  constructor(
    private positioningHelper: NbPositioningHelper,
    @Inject(NB_WINDOW) window) {
      this.window = window as Window;
    }

  /**
   * Calculated {@link NbPopoverPosition} based on placed element, host element,
   * placed element placement and adjustment strategy.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param host {ClientRect} host element.
   * @param placement {NbPopoverPlacement} placed element placement relatively host.
   * @param adjustment {NbPopoverAdjustment} adjustment strategy.
   *
   * @return {NbPopoverPosition} calculated position.
   * */
  adjust(placed: ClientRect,
         host: ClientRect,
         placement: NbPopoverPlacement,
         adjustment: NbPopoverAdjustment): NbPopoverPosition {
    const placements = NB_ORDERED_PLACEMENTS[adjustment].slice();
    const ordered = this.orderPlacements(placement, placements);
    const possible = ordered.map(pl => ({
      position: this.positioningHelper.calcPosition(placed, host, pl),
      placement: pl,
    }));

    return this.chooseBest(placed, possible);
  }

  /**
   * Searches first adjustment which doesn't go beyond the viewport.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param possible {NbPopoverPosition[]} possible positions list ordered according to adjustment strategy.
   *
   * @return {NbPopoverPosition} calculated position.
   * */
  private chooseBest(placed: ClientRect, possible: NbPopoverPosition[]): NbPopoverPosition {
    return possible.find(adjust => this.inViewPort(placed, adjust)) || possible.shift();
  }

  /**
   * Finds out is adjustment doesn't go beyond of the view port.
   *
   * @param placed {ClientRect} placed element relatively host.
   * @param position {NbPopoverPosition} position of the placed element.
   *
   * @return {boolean} true if placed element completely viewport.
   * */
  private inViewPort(placed: ClientRect, position: NbPopoverPosition): boolean {
    return position.position.top - this.window.pageYOffset > 0
      && position.position.left - this.window.pageXOffset > 0
      && position.position.top + placed.height < this.window.innerHeight + this.window.pageYOffset
      && position.position.left + placed.width < this.window.innerWidth + this.window.pageXOffset;
  }

  /**
   * Reorder placements list to make placement start point and fit {@link NbPopoverAdjustment}
   *
   * @param placement {NbPopoverPlacement} active placement
   * @param placements {NbPopoverPlacement[]} placements list according to the active adjustment strategy.
   *
   * @return {NbPopoverPlacement[]} correctly ordered placements list.
   *
   * @example order placements for {@link NbPopoverPlacement#RIGHT} and {@link NbPopoverAdjustment#CLOCKWISE}
   * ```
   * const placements = NB_ORDERED_PLACEMENTS[NbPopoverAdjustment.CLOCKWISE];
   * const ordered = orderPlacement(NbPopoverPlacement.RIGHT, placements);
   *
   * expect(ordered).toEqual([
   *  NbPopoverPlacement.RIGHT,
   *  NbPopoverPlacement.BOTTOM,
   *  NbPopoverPlacement.LEFT,
   *  NbPopoverPlacement.TOP,
   * ]);
   * ```
   * */
  private orderPlacements(placement: NbPopoverPlacement, placements: NbPopoverPlacement[]): NbPopoverPlacement[] {
    const index = placements.indexOf(placement);
    const start = placements.splice(index, placements.length);
    return start.concat(...placements);
  }
}
