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

import { NbCalendarMonthModelService } from './services/calendar-month-model.service';
import { NbDateService } from './services/date.service';

import { NbCalendarDayCellComponent } from './components/calendar-day-picker/calendar-day-cell.component';
import { NbCalendarDayPickerComponent } from './components/calendar-day-picker/calendar-day-picker.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { NbCalendarMonthCellComponent } from './components/calendar-month-picker/calendar-month-cell.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
import {
  NbCalendarPageableNavigationComponent,
} from './components/calendar-navigation/calendar-pageable-navigation.component';
import { NbCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { NbCalendarPickerRowComponent } from './components/calendar-picker/calendar-picker-row.component';
import { NbCalendarYearCellComponent } from './components/calendar-year-picker/calendar-year-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarWeekNumberComponent } from './components/calendar-week-number/nb-calendar-week-number.component';

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
  NbCalendarWeekNumberComponent,
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
