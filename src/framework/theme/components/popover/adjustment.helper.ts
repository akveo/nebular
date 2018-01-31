import { NbPlacement } from './positioning.helper';

export enum NbAdjustment {
  CLOCKWISE = 'clockwise',
}

export class NbAdjustmentHelper {

  static adjust(placed: ClientRect, host: ClientRect, placement: NbPlacement, adjustment: NbAdjustment): NbPlacement {
    return undefined;
  }
}
