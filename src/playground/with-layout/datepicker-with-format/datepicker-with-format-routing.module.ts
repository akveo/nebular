/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DateTimepickerDynamicInputsShowcaseComponent } from './date-timepicker-dynamic-inputs-showcase.component';
import { DatepickerDynamicInputsShowcaseComponent } from './datepicker-dynamic-inputs-showcase.component';
import { RangepickerDynamicInputsShowcaseComponent } from './rangepicker-dynamic-inputs-showcase.component';

const routes: Route[] = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatepickerWithFormatRoutingModule {}
