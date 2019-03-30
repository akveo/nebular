/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';
import { NbCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
  ],
  declarations: [NbCheckboxComponent],
  exports: [NbCheckboxComponent],
})
export class NbCheckboxModule { }
