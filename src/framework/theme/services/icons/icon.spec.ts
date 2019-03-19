/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbFontIcon, NbSvgIcon } from './icon';


describe('icon', () => {
  let fontIcon: NbFontIcon;
  let svgIcon: NbSvgIcon;


  it(`font icon renders`, () => {

    fontIcon = new NbFontIcon('home', 'custom', {
      packClass: 'custom-pack',
      iconPrefix: 'cp',
    });

    expect(fontIcon.render()).toEqual('custom');
  });

  it(`font icon getAttributes return class`, () => {

    fontIcon = new NbFontIcon('home', '', {
      packClass: 'custom-pack',
    });

    expect(fontIcon.getAttributes().class).toEqual('home custom-pack');
  });

  it(`font icon getAttributes return class with prefix`, () => {

    fontIcon = new NbFontIcon('home', '', {
      packClass: 'custom-pack',
      iconPrefix: 'cp',
    });

    expect(fontIcon.getAttributes().class).toEqual('cp-home custom-pack');
  });

  it(`font icon getAttributes return class with name only`, () => {

    fontIcon = new NbFontIcon('home', '');

    expect(fontIcon.getAttributes().class).toEqual('home');
  });

  it(`svg icon renders`, () => {

    svgIcon = new NbSvgIcon('home', 'content', {
      packClass: 'custom-pack',
    });

    expect(svgIcon.render()).toEqual('content');
  });

  it(`svg icon getAttributes return class`, () => {

    svgIcon = new NbSvgIcon('home', '', {
      packClass: 'custom-pack',
    });

    expect(svgIcon.getAttributes().class).toEqual('custom-pack');
  });

  it(`font icon getAttributes return class with name only`, () => {

    svgIcon = new NbSvgIcon('home', '');

    expect(svgIcon.getAttributes()).toEqual({});
  });
});
