/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { async, inject, TestBed } from '@angular/core/testing';

import { NbAdjustmentHelper } from './adjustment.helper';
import { NbPopoverAdjustment, NbPopoverPlacement } from './model';
import { NB_DOCUMENT, NB_WINDOW } from '../../../theme.options';
import { NbPositioningHelper } from './positioning.helper';

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

  let adjustmentHelper: NbAdjustmentHelper;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: NB_WINDOW, useValue: window },
        { provide: NB_DOCUMENT, useValue: document },
        NbPositioningHelper,
        NbAdjustmentHelper,
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbAdjustmentHelper],
    (_adjustmentHelper) => {
      adjustmentHelper = _adjustmentHelper
    },
  )));

  describe('clockwise strategy', () => {
    const strategy = NbPopoverAdjustment.CLOCKWISE;
    const placement = NbPopoverPlacement.TOP;

    it('adjust top to right when host in top left corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.RIGHT);
      expect(adjustment.position.top).toEqual(1035);
      expect(adjustment.position.left).toEqual(1120);
    });

    it('adjust top to bottom when host in top right corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.BOTTOM);
      expect(adjustment.position.top).toEqual(1120);
      expect(adjustment.position.left).toEqual(2025);
    });

    it('doesn\'t adjust top when in bottom right corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.bottomRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(1940);
      expect(adjustment.position.left).toEqual(2025);
    });

    it('doesn\'t adjust top when in bottom left corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.bottomLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(1940);
      expect(adjustment.position.left).toEqual(1035);
    });

    it('adjust top to left when host in the right part of the narrow rectangular view port', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.LEFT);
      expect(adjustment.position.top).toEqual(1035);
      expect(adjustment.position.left).toEqual(1940);
    });

    it('doesn\'t change position when there are no suitable positions at all', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(120);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(950);
      expect(adjustment.position.left).toEqual(1035);
    });
  });

  describe('counterclockwise strategy', () => {
    const strategy = NbPopoverAdjustment.COUNTERCLOCKWISE;
    const placement = NbPopoverPlacement.TOP;

    it('adjust top to bottom when host in top left corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.BOTTOM);
      expect(adjustment.position.top).toEqual(1120);
      expect(adjustment.position.left).toEqual(1035);
    });

    it('adjust top to left when host in top right corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.LEFT);
      expect(adjustment.position.top).toEqual(1035);
      expect(adjustment.position.left).toEqual(1940);
    });

    it('doesn\'t adjust top when in bottom right corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.bottomRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(1940);
      expect(adjustment.position.left).toEqual(2025);
    });

    it('doesn\'t adjust top when in bottom left corner', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.bottomLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(1940);
      expect(adjustment.position.left).toEqual(1035);
    });

    it('adjust top to left when host in the right part of the narrow rectangular view port', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.LEFT);
      expect(adjustment.position.top).toEqual(1035);
      expect(adjustment.position.left).toEqual(1940);
    });

    it('doesn\'t change position when there are no suitable positions at all', () => {
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(120);
      spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

      const adjustment = adjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

      expect(adjustment.placement).toEqual(NbPopoverPlacement.TOP);
      expect(adjustment.position.top).toEqual(950);
      expect(adjustment.position.left).toEqual(1035);
    });
  });
});
