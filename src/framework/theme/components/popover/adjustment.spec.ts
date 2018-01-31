/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAdjustment, NbAdjustmentHelper } from './adjustment.helper';
import { NbPlacement } from './positioning.helper';

/**
 * TODO
 * window mocking required.
 * */
describe('adjustment-helper', () => {
  const placedRect: ClientRect = {
    top: 50,
    bottom: 100,
    left: 50,
    right: 100,
    height: 50,
    width: 50,
  };

  const hostRect = {
    topLeft: {
      top: 10,
      bottom: 110,
      left: 10,
      right: 110,
      height: 100,
      width: 100,
    },
    topRight: {
      top: 10,
      bottom: 110,
      left: 1000,
      right: 1100,
      height: 100,
      width: 100,
    },
    bottomLeft: {
      top: 1000,
      bottom: 1100,
      left: 10,
      right: 110,
      height: 100,
      width: 100,
    },
    bottomRight: {
      top: 1000,
      bottom: 1100,
      left: 1000,
      right: 1100,
      height: 100,
      width: 100,
    },
  };

  describe('clockwise strategy', () => {
    const adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

    it('adjust top to right', () => {
      const placement = NbAdjustmentHelper.adjust(placedRect, hostRect.topLeft, NbPlacement.TOP, adjustment);
      expect(placement).toEqual(NbPlacement.RIGHT);
    });

    it('adjust top to bottom', () => {
      const placement = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, NbPlacement.TOP, adjustment);
      expect(placement).toEqual(NbPlacement.BOTTOM);
    });

    it('adjust top to left', () => {
      const placement = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, NbPlacement.TOP, adjustment);
      expect(placement).toEqual(NbPlacement.BOTTOM);
    });

    it('can\'t find adjustment from top', () => {
    });

    it('adjust right to bottom', () => {
    });

    it('adjust right to left', () => {
    });

    it('adjust right to top', () => {
    });

    it('can\'t find adjustment from right', () => {
    });

    it('adjust bottom to left', () => {
    });

    it('adjust bottom to top', () => {
    });

    it('adjust bottom to right', () => {
    });

    it('can\'t find adjustment from bottom', () => {
    });

    it('adjust left to top', () => {
    });

    it('adjust left to right', () => {
    });

    it('adjust left to bottom', () => {
    });

    it('can\'t find adjustment from left', () => {
    });
  });

  describe('adjust with counterclockwise strategy', () => {

    it('adjust top to left', () => {
    });

    it('adjust top to bottom', () => {
    });

    it('adjust top to right', () => {
    });

    it('can\'t find adjustment from top', () => {
    });

    it('adjust right to top', () => {
    });

    it('adjust right to left', () => {
    });

    it('adjust right to bottom', () => {
    });

    it('can\'t find adjustment from right', () => {
    });

    it('adjust bottom to right', () => {
    });

    it('adjust bottom to top', () => {
    });

    it('adjust bottom to left', () => {
    });

    it('can\'t find adjustment from bottom', () => {
    });

    it('adjust left to bottom', () => {
    });

    it('adjust left to right', () => {
    });

    it('adjust left to top', () => {
    });

    it('can\'t find adjustment from left', () => {
    });
  });
});
