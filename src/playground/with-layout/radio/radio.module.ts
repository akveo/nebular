/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbRadioModule } from '@nebular/theme';
import { RadioRoutingModule } from './radio-routing.module';
import { RadioDisabledComponent } from './radio-disabled.component';
import { RadioShowcaseComponent } from './radio-showcase.component';

@NgModule({
  declarations: [
    RadioDisabledComponent,
    RadioShowcaseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbRadioModule,
    NbCardModule,
    RadioRoutingModule,
  ],
})
export class RadioModule {}
