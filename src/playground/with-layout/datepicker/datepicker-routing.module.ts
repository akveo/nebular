/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DatepickerFormsComponent } from './datepicker-forms.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase.component';
import { DatepickerValidationComponent } from './datepicker-validation.component';
import { RangepickerShowcaseComponent } from './rangepicker-showcase.component';
import { DateTimepickerShowcaseComponent } from './date-timepicker-showcase.component';
import { DateTimepickerSingleColumnComponent } from './date-timepicker-single-column.component';
import { DatepickerFilterComponent } from './datepicker-filter.component';
import { DateTimepickerDynamicInputsShowcaseComponent } from './date-timepicker-dynamic-inputs-showcase.component';
import { DatepickerDynamicInputsShowcaseComponent } from './datepicker-dynamic-inputs-showcase.component';
import { RangepickerDynamicInputsShowcaseComponent } from './rangepicker-dynamic-inputs-showcase.component';

const routes: Route[] = [
  {
    path: 'datepicker-forms.component',
    component: DatepickerFormsComponent,
  },
  {
    path: 'datepicker-showcase.component',
    component: DatepickerShowcaseComponent,
  },
  {
    path: 'date-timepicker-showcase.component',
    component: DateTimepickerShowcaseComponent,
  },
  {
    path: 'date-timepicker-dynamic-inputs-showcase.component',
    component: DateTimepickerDynamicInputsShowcaseComponent,
  },
  {
    path: 'datepicker-dynamic-inputs-showcase.component',
    component: DatepickerDynamicInputsShowcaseComponent,
  },
  {
    path: 'rangepicker-dynamic-inputs-showcase.component',
    component: RangepickerDynamicInputsShowcaseComponent,
  },
  {
    path: 'date-timepicker-single-column.component',
    component: DateTimepickerSingleColumnComponent,
  },
  {
    path: 'datepicker-validation.component',
    component: DatepickerValidationComponent,
  },
  {
    path: 'rangepicker-showcase.component',
    component: RangepickerShowcaseComponent,
  },
  {
    path: 'datepicker-filter.component',
    component: DatepickerFilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatepickerRoutingModule {}
