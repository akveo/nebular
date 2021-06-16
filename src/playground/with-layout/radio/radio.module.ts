/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbRadioModule } from '@nebular/theme';
import { RadioRoutingModule } from './radio-routing.module';
import { RadioDisabledComponent } from './radio-disabled.component';
import { RadioShowcaseComponent } from './radio-showcase.component';
import { RadioStatusesComponent } from './radio-statuses.component';
import { RadioDisabledGroupComponent } from './radio-disabled-group.component';
import { RadioFormComponent } from './radio-form.component';

@NgModule({
  declarations: [
    RadioDisabledComponent,
    RadioShowcaseComponent,
    RadioDisabledComponent,
    RadioStatusesComponent,
    RadioDisabledGroupComponent,
    RadioFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbRadioModule,
    NbCardModule,
    RadioRoutingModule,
  ],
})
export class RadioModule {}
