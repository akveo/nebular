/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { DatepickerFormsComponent } from './datepicker-forms.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase.component';
import { DatepickerValidationComponent } from './datepicker-validation.component';
import { RangepickerShowcaseComponent } from './rangepicker-showcase.component';
import { DateTimepickerShowcaseComponent } from './date-timepicker-showcase.component';
import { DateTimepickerFullTImeComponent } from './date-timepicker-full-time.component';

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
    path: 'date-timepicker-full-time.component',
    component: DateTimepickerFullTImeComponent,
  },
  {
    path: 'datepicker-validation.component',
    component: DatepickerValidationComponent,
  },
  {
    path: 'rangepicker-showcase.component',
    component: RangepickerShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DatepickerRoutingModule {}
