/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit-full-calendar.component';

const routes: Route[] = [
  {
    path: 'calendar-kit-full-calendar.component',
    component: CalendarKitFullCalendarShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarKitRoutingModule {}
