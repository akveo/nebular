/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbTimepickerModule,
} from '@areyoufreebusy/theme';
import { DatepickerWithFormatRoutingModule } from './datepicker-with-format-routing.module';
import { DateTimepickerDynamicInputsShowcaseComponent } from './date-timepicker-dynamic-inputs-showcase.component';
import { NbDateFnsDateModule } from '@areyoufreebusy/date-fns';
import { DatepickerDynamicInputsShowcaseComponent } from './datepicker-dynamic-inputs-showcase.component';
import { RangepickerDynamicInputsShowcaseComponent } from './rangepicker-dynamic-inputs-showcase.component';

@NgModule({
  declarations: [
    DateTimepickerDynamicInputsShowcaseComponent,
    DatepickerDynamicInputsShowcaseComponent,
    RangepickerDynamicInputsShowcaseComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbInputModule,
    DatepickerWithFormatRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbDateFnsDateModule.forRoot({}),
  ],
})
export class DatepickerWithFormatModule {}
