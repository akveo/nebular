import { NbPlacement, NbPosition, NbPositioningHelper } from './positioning.helper';

export class NbAdjustment {
  position: NbPosition;
  placement: NbPlacement;
}

export enum NbAdjustmentStrategy {
  CLOCKWISE = 'clockwise',
}

const NB_ADJUSTMENT_STRATEGY_PLACEMENT_ORDER = {
  [NbAdjustmentStrategy.CLOCKWISE]: [
    NbPlacement.TOP,
    NbPlacement.RIGHT,
    NbPlacement.BOTTOM,
    NbPlacement.LEFT,
  ],
};

export class NbAdjustmentHelper {

  constructor(private placed: ClientRect,
              private host: ClientRect,
              private placement: NbPlacement) {
  }

  adjust(adjustmentStrategy: NbAdjustmentStrategy): NbAdjustment {
    const possibleAdjustments: NbAdjustment[] = this.calcPossibleAdjustments(adjustmentStrategy);
    return this.chooseBestAdjustment(possibleAdjustments);
  }

  private calcPossibleAdjustments(adjustment: NbAdjustmentStrategy): NbAdjustment[] {
    const placementOrder: NbPlacement[] = NB_ADJUSTMENT_STRATEGY_PLACEMENT_ORDER[adjustment];
    const pos = placementOrder.findIndex(pl => pl === this.placement);
    const start = placementOrder.splice(pos, 1);
    const orderedPlacements = placementOrder.concat(...start);
    return orderedPlacements.map(pl => ({
      position: NbPositioningHelper.calcPosition(this.placed, this.host, pl),
      placement: pl,
    }));
  }

  private chooseBestAdjustment(possibleAdjustment: NbAdjustment[]): NbAdjustment {
    return possibleAdjustment.find(adj => this.inViewPort(adj)) || possibleAdjustment.pop();
  }

  private inViewPort(adjustment: NbAdjustment): boolean {
    return adjustment.position.top > 0 &&
      adjustment.position.left > 0 &&
      adjustment.position.top + this.placed.height < window.innerHeight &&
      adjustment.position.left + this.placed.width < window.innerWidth;
  }
}
