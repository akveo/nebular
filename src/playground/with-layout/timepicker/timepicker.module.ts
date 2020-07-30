/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbTimepickerModule, NbInputModule, NbIconModule, NbFormFieldModule } from '@nebular/theme';

import { TimepickerShowcaseComponent } from './timepicker-showcase.component';
import { TimepickerTwelveHoursFormatComponent } from './timepicker-twelve-hours-format.component';
import { TimepickerSingleColumnComponent } from './timepicker-single-column.component';
import { TimepickerWithSecondsComponent } from './timepicker-with-seconds.component';
import { TimepickerRoutingModule } from './timepicker-routing.module';

@NgModule({
  declarations: [
    TimepickerShowcaseComponent,
    TimepickerTwelveHoursFormatComponent,
    TimepickerSingleColumnComponent,
    TimepickerWithSecondsComponent,
  ],
  imports: [
    NbTimepickerModule.forRoot({ isTwelveHoursFormat: false }),
    TimepickerRoutingModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    CommonModule,
  ],
})
export class TimepickerModule {}
