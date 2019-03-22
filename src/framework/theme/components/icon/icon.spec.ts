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

  it(`font icon getClasses return classes`, () => {

    fontIcon = new NbFontIcon('home', '', {
      packClass: 'custom-pack',
    });

    expect(fontIcon.getClasses()).toEqual(['custom-pack', 'home']);
  });

  it(`font icon getClasses return class with prefix`, () => {

    fontIcon = new NbFontIcon('home', '', {
      packClass: 'custom-pack',
      iconPrefix: 'cp',
    });

    expect(fontIcon.getClasses()).toEqual(['custom-pack', 'cp-home']);
  });

  it(`font icon getClasses return class with name only`, () => {

    fontIcon = new NbFontIcon('home', '');

    expect(fontIcon.getClasses()).toEqual(['home']);
  });

  it(`svg icon renders`, () => {

    svgIcon = new NbSvgIcon('home', 'content', {
      packClass: 'custom-pack',
    });

    expect(svgIcon.render()).toEqual('content');
  });

  it(`svg icon getClasses return class`, () => {

    svgIcon = new NbSvgIcon('home', '', {
      packClass: 'custom-pack',
    });

    expect(svgIcon.getClasses()).toEqual(['custom-pack']);
  });

  it(`svg icon getClasses return class without name`, () => {

    svgIcon = new NbSvgIcon('home', '');

    expect(svgIcon.getClasses()).toEqual([]);
  });
});
