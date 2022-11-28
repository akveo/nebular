/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbTimepickerModule } from '@nebular/theme';
import { DatepickerRoutingModule } from './datepicker-routing.module';
import { DatepickerFormsComponent } from './datepicker-forms.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase.component';
import { DatepickerValidationComponent } from './datepicker-validation.component';
import { RangepickerShowcaseComponent } from './rangepicker-showcase.component';
import { DateTimepickerShowcaseComponent } from './date-timepicker-showcase.component';
import { DateTimepickerSingleColumnComponent } from './date-timepicker-single-column.component';
import { DatepickerFilterComponent } from './datepicker-filter.component';

@NgModule({
  declarations: [
    DatepickerFormsComponent,
    DatepickerShowcaseComponent,
    DateTimepickerShowcaseComponent,
    DateTimepickerSingleColumnComponent,
    DatepickerValidationComponent,
    RangepickerShowcaseComponent,
    DatepickerFilterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbInputModule,
    DatepickerRoutingModule,
    NbCardModule,
    NbButtonModule,
  ],
})
export class DatepickerModule {}
