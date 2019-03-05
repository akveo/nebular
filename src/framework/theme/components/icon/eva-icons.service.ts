/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbIconLibraryService } from './icon-library.service';
import { icons } from 'eva-icons';

/**
 * NbEvaIcons is a services that registers `eva-icons` as Nebular SVG icons library.
 */
@Injectable()
export class NbEvaIconsService {

  private NAME = 'eva';

  constructor(private iconLibrary: NbIconLibraryService) {
    this.iconLibrary.registerSvgPack(this.NAME, new Map(Object.entries(icons)));
    this.iconLibrary.setDefaultPack(this.NAME);
  }
}
