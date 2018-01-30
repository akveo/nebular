/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbPlacement, NbPositioningHelper } from './positioning.helper';

/**
 * TODO
 * add tests with page offset.
 * */
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

  it('correctly locates top placement', () => {
    const position = NbPositioningHelper.calcPosition(placedRect, hostRect, NbPlacement.TOP);
    expect(position.top).toEqual(40);
    expect(position.left).toEqual(125);
  });

  it('correctly locates bottom placement', () => {
    const position = NbPositioningHelper.calcPosition(placedRect, hostRect, NbPlacement.BOTTOM);
    expect(position.top).toEqual(210);
    expect(position.left).toEqual(125);
  });

  it('correctly locates left placement', () => {
    const position = NbPositioningHelper.calcPosition(placedRect, hostRect, NbPlacement.LEFT);
    expect(position.top).toEqual(125);
    expect(position.left).toEqual(40);
  });

  it('correctly locates right placement', () => {
    const position = NbPositioningHelper.calcPosition(placedRect, hostRect, NbPlacement.RIGHT);
    expect(position.top).toEqual(125);
    expect(position.left).toEqual(210);
  });
});
