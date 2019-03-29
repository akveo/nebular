/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbIconLibraries, NbSvgIcon, NbIcons } from '@nebular/theme';
import { icons } from 'eva-icons';

interface NbOriginalEvaIcon {
  toSvg(options: NbEvaIconOptions);
}

export interface NbEvaIconOptions {
  width: string,
  height: string,
  fill: string,
  animation: {
    type: string,
    hover: boolean,
    infinite: boolean,
  },
}

export class NbEvaSvgIcon extends NbSvgIcon {

  constructor(protected name, protected content: NbOriginalEvaIcon) {
    super(name, '');
  }

  getContent(options): string {
    return this.content.toSvg({
      width: '100%',
      height: '100%',
      fill: 'currentColor',
      ...options,
    });
  }
}

@NgModule({})
export class NbEvaIconsModule {

  private NAME = 'eva';

  constructor(iconLibrary: NbIconLibraries) {
    iconLibrary.registerSvgPack(this.NAME, this.createIcons());
    iconLibrary.setDefaultPack(this.NAME);
  }

  private createIcons(): NbIcons {
    return Object
      .entries<NbOriginalEvaIcon>(icons)
      .map(([name, icon]) => {
        return [name, new NbEvaSvgIcon(name, icon)] as [string, NbSvgIcon];
      })
      .reduce((newIcons, [name, icon]: [string, NbSvgIcon]) => {
        newIcons[name] = icon;
        return newIcons;
      }, {});
  }
}
