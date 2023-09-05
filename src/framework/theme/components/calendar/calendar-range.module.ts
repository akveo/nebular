/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbBaseCalendarModule } from './base-calendar.module';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';
import { NbCalendarRangeMonthCellComponent } from './calendar-range-month-cell.component';
import { NbCalendarRangeYearCellComponent } from './calendar-range-year-cell.component';
import { NbCalendarRangeComponent } from './calendar-range.component';

@NgModule({
  imports: [NbBaseCalendarModule],
  exports: [NbCalendarRangeComponent],
  declarations: [
    NbCalendarRangeComponent,
    NbCalendarRangeDayCellComponent,
    NbCalendarRangeYearCellComponent,
    NbCalendarRangeMonthCellComponent,
  ],
})
export class NbCalendarRangeModule {}
