/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbCalendarRangeComponent } from './calendar-range.component';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';
import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarKitModule } from '../calendar-kit';
import { NbCalendarModule } from './calendar.module';


@NgModule({
  imports: [NbCalendarModule, NbCalendarKitModule, NbSharedModule],
  exports: [NbCalendarRangeComponent],
  declarations: [NbCalendarRangeComponent, NbCalendarRangeDayCellComponent, NbCalendarRangeDayCellComponent],
})
export class NbCalendarRangeModule {
}
