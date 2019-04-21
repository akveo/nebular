/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';

import { NbCalendarMonthModelService, NbDateService  } from './services';

import {
  NbCalendarDayCellComponent,
  NbCalendarDayPickerComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthCellComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarPickerComponent,
  NbCalendarPickerRowComponent,
  NbCalendarYearCellComponent,
  NbCalendarYearPickerComponent,
} from './components';
import { NbNativeDateService } from './services/native-date.service';


const SERVICES = [
  { provide: NbDateService, useClass: NbNativeDateService },
  DatePipe,
  NbCalendarMonthModelService,
];

const COMPONENTS = [
  NbCalendarHeaderComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarDayPickerComponent,
  NbCalendarDayCellComponent,
  NbCalendarMonthCellComponent,
  NbCalendarYearCellComponent,
  NbCalendarPickerRowComponent,
  NbCalendarPickerComponent,
];

/**
 * `NbCalendarKitModule` is a module that contains multiple useful components for building custom calendars.
 * So if you think our calendars is not enough powerful for you just use calendar-kit and build your own calendar!
 *
 * Available components:
 * - `NbCalendarDayPicker`
 * - `NbCalendarDayCell`
 * - `NbCalendarMonthPicker`
 * - `NbCalendarMonthCell`
 * - `NbCalendarYearPicker`
 * - `NbCalendarYearCell`
 * - `NbCalendarHeader`
 * - `NbCalendarNavigation`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
@NgModule({
  imports: [ NbSharedModule, NbButtonModule, NbIconModule ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [...SERVICES],
  entryComponents: [
    NbCalendarDayCellComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
  ],
})
export class NbCalendarKitModule {
}
