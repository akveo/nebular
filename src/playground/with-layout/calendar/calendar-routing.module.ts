/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { CalendarBoundingMonthComponent } from './calendar-bounding-month.component';
import { CalendarCustomDayCellShowcaseComponent } from './calendar-custom-day-cell-showcase.component';
import { CalendarFilterComponent } from './calendar-filter.component';
import { CalendarMinMaxComponent } from './calendar-min-max.component';
import { CalendarRangeShowcaseComponent } from './calendar-range-showcase.component';
import { CalendarShowcaseComponent } from './calendar-showcase.component';
import { CalendarSizeComponent } from './calendar-size.component';
import { CalendarStartViewComponent } from './calendar-start-view.component';
import { CalendarWithoutHeaderComponent } from './calendar-without-header.component';
import { CalendarWeekNumberComponent } from './calendar-week-number.component';

const routes: Route[] = [
  {
    path: 'calendar-bounding-month.component',
    component: CalendarBoundingMonthComponent,
  },
  {
    path: 'calendar-custom-day-cell-showcase.component',
    component: CalendarCustomDayCellShowcaseComponent,
  },
  {
    path: 'calendar-filter.component',
    component: CalendarFilterComponent,
  },
  {
    path: 'calendar-min-max.component',
    component: CalendarMinMaxComponent,
  },
  {
    path: 'calendar-range-showcase.component',
    component: CalendarRangeShowcaseComponent,
  },
  {
    path: 'calendar-showcase.component',
    component: CalendarShowcaseComponent,
  },
  {
    path: 'calendar-size.component',
    component: CalendarSizeComponent,
  },
  {
    path: 'calendar-start-view.component',
    component: CalendarStartViewComponent,
  },
  {
    path: 'calendar-without-header.component',
    component: CalendarWithoutHeaderComponent,
  },
  {
    path: 'calendar-week-number.component',
    component: CalendarWeekNumberComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CalendarRoutingModule {}
