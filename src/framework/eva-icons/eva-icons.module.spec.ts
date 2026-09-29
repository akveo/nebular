import { NbIconLibraries, NbSvgIcon } from '@nebular/theme';
import { NbEvaIconsModule, NbEvaSvgIcon } from './eva-icons.module';

describe('NbEvaIconsModule', () => {
  it('should register the Eva icon pack and make it the default pack', () => {
    const iconLibrary = jasmine.createSpyObj<NbIconLibraries>('NbIconLibraries', ['registerSvgPack', 'setDefaultPack']);

    new NbEvaIconsModule(iconLibrary);

    expect(iconLibrary.registerSvgPack).toHaveBeenCalledWith('eva', jasmine.any(Object));
    const registeredIcons = iconLibrary.registerSvgPack.calls.mostRecent().args[1];
    expect(registeredIcons['activity']).toEqual(jasmine.any(NbSvgIcon));
    expect(iconLibrary.setDefaultPack).toHaveBeenCalledWith('eva');
  });
});

describe('NbEvaSvgIcon', () => {
  it('should render with Nebular defaults and preserve caller options', () => {
    const content = jasmine.createSpyObj('EvaIcon', ['toSvg']);
    content.toSvg.and.returnValue('<svg></svg>');
    const icon = new NbEvaSvgIcon('activity', content);

    expect(icon.getContent({ fill: 'red' })).toBe('<svg></svg>');
    expect(content.toSvg).toHaveBeenCalledWith({
      width: '100%',
      height: '100%',
      fill: 'red',
    });
  });
});
