/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbIconComponent } from './icon.component';
import { NbIconsLibrary } from './icons-library';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NbIconComponent,
  ],
  exports: [
    NbIconComponent,
  ],
})
export class NbIconModule {

  constructor(private iconsLibrary: NbIconsLibrary) {
    // @breaking-change 4.0.0 remove and replace with eva-icons module
    this.iconsLibrary.registerFontPack('nebular', { iconPrefix: 'nb' });
    this.iconsLibrary.setDefaultPack('nebular');
  }
}
