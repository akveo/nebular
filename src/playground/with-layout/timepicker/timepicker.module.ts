/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { TimepickerShowcaseComponent } from './timepicker-showcase.component';
import { TimepickerRoutingModule } from './timepicker-routing.module';
import { NbCardModule, NbTimepickerModule, NbInputModule, NbIconModule, NbFormFieldModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NbMomentDateModule } from '../../../framework/moment/moment.module';

@NgModule({
  declarations: [
    TimepickerShowcaseComponent,
  ],
  imports: [
    // NbTimepickerModule.forRoot({isTwelveHoursFormat: false}),
    NbTimepickerModule.forRoot(),
    TimepickerRoutingModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    CommonModule,
    NbMomentDateModule,
  ],
})
export class TimepickerModule {}
