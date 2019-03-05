/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbIconComponent } from './icon.component';
import { NbIconLibraryService } from './icon-library.service';
import { NbEvaIconsService } from './eva-icons.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NbIconComponent,
  ],
  providers: [
    NbIconLibraryService,
    NbEvaIconsService,
  ],
  exports: [
    NbIconComponent,
  ],
})
export class NbIconModule {
}
