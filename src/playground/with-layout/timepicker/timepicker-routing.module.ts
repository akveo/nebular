/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TimepickerShowcaseComponent } from './timepicker-showcase.component';
import { TimepickerTwelveHoursFormatComponent } from './timepicker-twelve-hours-format.component';
import { TimepickerSingleColumnComponent } from './timepicker-single-column.component';
import { TimepickerWithSecondsComponent } from './timepicker-with-seconds.component';

const routes: Route[] = [
  {
    path: 'timepicker-showcase.component',
    component: TimepickerShowcaseComponent,
  },
  {
    path: 'timepicker-twelve-hours-format.component',
    component: TimepickerTwelveHoursFormatComponent,
  },
  {
    path: 'timepicker-single-column.component',
    component: TimepickerSingleColumnComponent,
  },
  {
    path: 'timepicker-with-seconds.component',
    component: TimepickerWithSecondsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TimepickerRoutingModule {}
