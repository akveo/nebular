/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { async, inject, TestBed } from '@angular/core/testing';

import { NbPositioningHelper } from './positioning.helper';
import { NbPopoverPlacement } from './model';
import { NB_DOCUMENT, NB_WINDOW } from '../../../theme.options';

describe('positioning-helper', () => {
  const placedRect: ClientRect = {
    top: 50,
    bottom: 100,
    left: 50,
    right: 100,
    height: 50,
    width: 50,
  };

  const hostRect: ClientRect = {
    top: 100,
    bottom: 200,
    left: 100,
    right: 200,
    height: 100,
    width: 100,
  };

  let positioningHelper: NbPositioningHelper;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: NB_WINDOW, useValue: window },
        { provide: NB_DOCUMENT, useValue: document },
        NbPositioningHelper,
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbPositioningHelper],
    (_positioningHelper) => {
      positioningHelper = _positioningHelper
    },
  )));

  it('correctly locates top placement', () => {
    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.TOP);
    expect(position.top).toEqual(40);
    expect(position.left).toEqual(125);
  });

  it('correctly locates bottom placement', () => {
    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.BOTTOM);
    expect(position.top).toEqual(210);
    expect(position.left).toEqual(125);
  });

  it('correctly locates left placement', () => {
    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.LEFT);
    expect(position.top).toEqual(125);
    expect(position.left).toEqual(40);
  });

  it('correctly locates right placement', () => {
    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.RIGHT);
    expect(position.top).toEqual(125);
    expect(position.left).toEqual(210);
  });

  it('correctly locates top placement when view port has offset', () => {
    spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
    spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.TOP);

    expect(position.top).toEqual(1040);
    expect(position.left).toEqual(1125);
  });

  it('correctly locates bottom placement when view port has offset', () => {
    spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
    spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.BOTTOM);

    expect(position.top).toEqual(1210);
    expect(position.left).toEqual(1125);
  });

  it('correctly locates left placement when view port has offset', () => {
    spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
    spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.LEFT);

    expect(position.top).toEqual(1125);
    expect(position.left).toEqual(1040);
  });

  it('correctly locates right placement when view port has offset', () => {
    spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
    spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

    const position = positioningHelper.calcPosition(placedRect, hostRect, NbPopoverPlacement.RIGHT);

    expect(position.top).toEqual(1125);
    expect(position.left).toEqual(1210);
  });
});
