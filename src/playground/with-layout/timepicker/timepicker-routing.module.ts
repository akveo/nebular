/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TimepickerShowcaseComponent } from './timepicker-showcase.component';
import { TimepickerTwelveHoursFormatComponent } from './timepicker-twelve-hours-format.component';
import { TimepickerFullHoursFormatComponent } from './timepicker-fullHours-format.component';

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
    path: 'timepicker-full-hours-format.component',
    component: TimepickerFullHoursFormatComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TimepickerRoutingModule {}
