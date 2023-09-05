/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';
import { NbSharedModule } from '../shared/shared.module';

import { NbCalendarMonthModelService } from './services/calendar-month-model.service';
import { NbDateService } from './services/date.service';

import { NbCalendarDayCellComponent } from './components/calendar-day-picker/calendar-day-cell.component';
import { NbCalendarDayPickerComponent } from './components/calendar-day-picker/calendar-day-picker.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarMonthCellComponent } from './components/calendar-month-picker/calendar-month-cell.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarPageableNavigationComponent } from './components/calendar-navigation/calendar-pageable-navigation.component';
import { NbCalendarViewModeComponent } from './components/calendar-navigation/calendar-view-mode.component';
import { NbCalendarPickerRowComponent } from './components/calendar-picker/calendar-picker-row.component';
import { NbCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { NbCalendarWeekNumberComponent } from './components/calendar-week-number/calendar-week-number.component';
import { NbCalendarYearCellComponent } from './components/calendar-year-picker/calendar-year-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';

import { NbCalendarActionsComponent } from './components/calendar-actions/calendar-actions.component';
import { NbCalendarTimeModelService } from './services/calendar-time-model.service';
import { NbCalendarYearModelService } from './services/calendar-year-model.service';
import { NbNativeDateService } from './services/native-date.service';

const SERVICES = [
  { provide: NbDateService, useClass: NbNativeDateService },
  DatePipe,
  NbCalendarMonthModelService,
  NbCalendarYearModelService,
  NbCalendarTimeModelService,
];

const COMPONENTS = [
  NbCalendarViewModeComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarDayPickerComponent,
  NbCalendarDayCellComponent,
  NbCalendarActionsComponent,
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
 * - `NbCalendarViewModeComponent`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
@NgModule({
  imports: [NbSharedModule, NbButtonModule, NbIconModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [...SERVICES],
})
export class NbCalendarKitModule {}
