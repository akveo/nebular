/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCalendarModule, NbCalendarRangeModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarBoundingMonthComponent } from './calendar-bounding-month.component';
import { CalendarCustomDayCellShowcaseComponent } from './calendar-custom-day-cell-showcase.component';
import { CalendarFilterComponent } from './calendar-filter.component';
import { CalendarMinMaxComponent } from './calendar-min-max.component';
import { CalendarRangeShowcaseComponent } from './calendar-range-showcase.component';
import { CalendarShowcaseComponent } from './calendar-showcase.component';
import { CalendarSizeComponent } from './calendar-size.component';
import { CalendarStartViewComponent } from './calendar-start-view.component';
import { CalendarWithoutNavigationComponent } from './calendar-without-navigation.component';
import { CalendarCustomDayCellComponent } from './components/calendar-custom-day-cell.component';
import { CalendarWeekNumberComponent } from './calendar-week-number.component';

@NgModule({
  declarations: [
    CalendarBoundingMonthComponent,
    CalendarCustomDayCellShowcaseComponent,
    CalendarFilterComponent,
    CalendarMinMaxComponent,
    CalendarRangeShowcaseComponent,
    CalendarShowcaseComponent,
    CalendarSizeComponent,
    CalendarStartViewComponent,
    CalendarWithoutNavigationComponent,
    CalendarCustomDayCellComponent,
    CalendarWeekNumberComponent,
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    CalendarRoutingModule,
  ],
})
export class CalendarModule {}
