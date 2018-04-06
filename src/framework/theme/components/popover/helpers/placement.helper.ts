import { Injectable } from '@angular/core';
import { NbLayoutDirectionService } from '../../../services/direction.service';
import { NbPopoverPlacement, NbPopoverLogicalPlacement } from './model';

@Injectable()
export class NbPlacementHelper {
  constructor(private layoutDirectionService: NbLayoutDirectionService) {}

  /*
   * Maps logical position to physical according to current layout direction.
   * */
  public toPhysicalPlacement(
    placement: NbPopoverPlacement | NbPopoverLogicalPlacement,
  ): NbPopoverPlacement {
    const isLtr = this.layoutDirectionService.isLtr();

    if (placement === NbPopoverLogicalPlacement.START) {
      return isLtr ? NbPopoverPlacement.LEFT : NbPopoverPlacement.RIGHT;
    }
    if (placement === NbPopoverLogicalPlacement.END) {
      return isLtr ? NbPopoverPlacement.RIGHT : NbPopoverPlacement.LEFT;
    }

    return placement;
  }
}
