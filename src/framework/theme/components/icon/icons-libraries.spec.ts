import { TestBed } from '@angular/core/testing';

import { NbIconLibraries } from './icon-libraries';
import { NbSvgIcon } from './icon';


describe('icons-library', () => {
  let iconsLibrary: NbIconLibraries;

  beforeEach(() => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      providers: [
        NbIconLibraries,
      ],
    });
    iconsLibrary = bed.get(NbIconLibraries);
  });

  it('should register raw svg icon', () => {

    iconsLibrary.registerSvgPack('super-pack', { home: '<svg><rect></rect></svg>', gear: '<svg></svg>'  });
    iconsLibrary.setDefaultPack('super-pack');

    const icon = iconsLibrary.getSvgIcon('home');

    expect(icon.icon.getContent()).toEqual('<svg><rect></rect></svg>');
    expect(icon.name).toEqual('home');
    expect(icon.pack).toEqual('super-pack');
    expect(icon.type).toEqual('svg');
  });

  it('should register NbSvgIcon svg icon', () => {

    iconsLibrary.registerSvgPack('super-pack', {
      home: new NbSvgIcon('home', '<svg><rect></rect></svg>', { packClass: 'sp' }),
    });
    iconsLibrary.setDefaultPack('super-pack');

    const icon = iconsLibrary.getSvgIcon('home');

    expect(icon.icon.getContent()).toEqual('<svg><rect></rect></svg>');
    expect(icon.icon.getClasses()).toEqual(['sp']);
    expect(icon.name).toEqual('home');
    expect(icon.pack).toEqual('super-pack');
    expect(icon.type).toEqual('svg');
  });

  it('should register custom svg icon', () => {

    class CustomSvgIcon extends NbSvgIcon {
      getContent() {
          return 'custom';
      }
    }

    iconsLibrary.registerSvgPack('super-pack', {
      home: new CustomSvgIcon('home', '<svg><rect></rect></svg>', { packClass: 'sp' }),
    });
    iconsLibrary.setDefaultPack('super-pack');

    const icon = iconsLibrary.getSvgIcon('home');

    expect(icon.icon.getContent()).toEqual('custom');
    expect(icon.icon.getClasses()).toEqual(['sp']);
    expect(icon.name).toEqual('home');
    expect(icon.pack).toEqual('super-pack');
    expect(icon.type).toEqual('svg');
  });

  it('should throw for unknown svg icon', () => {

    iconsLibrary.registerSvgPack('super-pack', { home: '<svg><rect></rect></svg>', gear: '<svg></svg>'  });
    iconsLibrary.setDefaultPack('super-pack');


    expect(() => iconsLibrary.getSvgIcon('unknown'))
      // tslint:disable-next-line:max-line-length
      .toThrowError(`Icon 'unknown' is not registered in pack 'super-pack'. Check icon name or consider switching icon pack.`);
  });

  it('should throw for no default pack', () => {
    expect(() => iconsLibrary.getSvgIcon('unknown')).toThrowError('Default pack is not registered.');
  });

  it('should throw for wrong pack type', () => {

    iconsLibrary.registerSvgPack('super-pack', { home: '<svg><rect></rect></svg>', gear: '<svg></svg>'  });
    iconsLibrary.registerFontPack('font-pack');
    iconsLibrary.setDefaultPack('font-pack');


    expect(() => iconsLibrary.getSvgIcon('unknown'))
      .toThrowError(`Pack 'font-pack' is not an 'SVG' Pack and its type is 'font'`);
  });

  it('should throw for wrong pack', () => {

    iconsLibrary.registerSvgPack('super-pack', { home: '<svg><rect></rect></svg>', gear: '<svg></svg>'  });
    iconsLibrary.registerFontPack('font-pack');
    iconsLibrary.setDefaultPack('super-pack');

    expect(() => iconsLibrary.getSvgIcon('unknown'))
      // tslint:disable-next-line:max-line-length
      .toThrowError(`Icon 'unknown' is not registered in pack 'super-pack'. Check icon name or consider switching icon pack.`);
  });

  it('should throw for wrong pack when setting default', () => {

    iconsLibrary.registerFontPack('font-pack');

    expect(() => iconsLibrary.setDefaultPack('super-pack'))
      .toThrowError(`Icon Pack 'super-pack' is not registered`);
  });

  it('should register font icon', () => {

    iconsLibrary.registerFontPack('font-pack', { packClass: 'font', iconClassPrefix: 'fp' });
    iconsLibrary.setDefaultPack('font-pack');

    const icon = iconsLibrary.getFontIcon('home');

    expect(icon.icon.getContent()).toEqual('');
    expect(icon.icon.getClasses()).toEqual(['font', 'fp-home']);
    expect(icon.name).toEqual('home');
    expect(icon.pack).toEqual('font-pack');
    expect(icon.type).toEqual('font');
  });


  it('should return icon', () => {

    iconsLibrary.registerSvgPack('super-pack', { home: '<svg><rect></rect></svg>', gear: '<svg></svg>'  });
    iconsLibrary.registerFontPack('font-pack', { packClass: 'font', iconClassPrefix: 'fp' });
    iconsLibrary.setDefaultPack('font-pack');

    const icon = iconsLibrary.getIcon('home');
    const svgIcon = iconsLibrary.getIcon('home', 'super-pack');

    expect(icon.icon.getContent()).toEqual('');
    expect(icon.icon.getClasses()).toEqual(['font', 'fp-home']);
    expect(icon.icon.getClasses()).toEqual(['font', 'fp-home']);
    expect(icon.name).toEqual('home');
    expect(icon.pack).toEqual('font-pack');
    expect(icon.type).toEqual('font');

    expect(svgIcon.icon.getContent()).toEqual('<svg><rect></rect></svg>');
    expect(svgIcon.name).toEqual('home');
    expect(svgIcon.pack).toEqual('super-pack');
    expect(svgIcon.type).toEqual('svg');
  });

});
