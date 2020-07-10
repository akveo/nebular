/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { TimepickerShowcaseComponent } from './timepicker-showcase.component';
import { TimepickerTwelveHoursFormatComponent } from './timepicker-twelve-hours-format.component';
import { TimepickerFullHoursFormatComponent } from './timepicker-fullHours-format.component';
import { TimepickerRoutingModule } from './timepicker-routing.module';
import { NbCardModule, NbTimepickerModule, NbInputModule, NbIconModule, NbFormFieldModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NbMomentDateModule } from '../../../framework/moment/moment.module';

@NgModule({
  declarations: [
    TimepickerShowcaseComponent,
    TimepickerTwelveHoursFormatComponent,
    TimepickerFullHoursFormatComponent,
  ],
  imports: [
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
