/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbCalendarRangeComponent } from './calendar-range.component';
import { NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent } from './calendar-range-cells';
import { NbBaseCalendarModule } from './base-calendar.module';


@NgModule({
  imports: [NbBaseCalendarModule],
  exports: [NbCalendarRangeComponent],
  declarations: [
    NbCalendarRangeComponent,
    NbCalendarRangeDayCellComponent,
    NbCalendarRangeYearCellComponent,
  ],
  entryComponents: [NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent],
})
export class NbCalendarRangeModule {
}
