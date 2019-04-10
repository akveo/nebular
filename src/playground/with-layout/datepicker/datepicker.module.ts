/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { DatepickerRoutingModule } from './datepicker-routing.module';
import { DatepickerFormsComponent } from './datepicker-forms.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase.component';
import { DatepickerValidationComponent } from './datepicker-validation.component';
import { RangepickerShowcaseComponent } from './rangepicker-showcase.component';

@NgModule({
  declarations: [
    DatepickerFormsComponent,
    DatepickerShowcaseComponent,
    DatepickerValidationComponent,
    RangepickerShowcaseComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbInputModule,
    DatepickerRoutingModule,
    NbCardModule,
  ],
})
export class DatepickerModule {}
