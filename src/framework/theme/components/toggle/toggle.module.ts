/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [NbToggleComponent],
  exports: [NbToggleComponent],
})
export class NbToggleModule { }
