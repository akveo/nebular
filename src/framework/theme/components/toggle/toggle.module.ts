/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbIconModule } from '../icon/icon.module';

import { NbToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
  ],
  declarations: [NbToggleComponent],
  exports: [NbToggleComponent],
})
export class NbToggleModule { }
