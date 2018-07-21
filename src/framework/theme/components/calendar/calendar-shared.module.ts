/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbCalendarCellComponent } from './components/calendar-cell/calendar-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarMonthViewComponent } from './components/calendar-month-view/calendar-month-view.component';
import { NbCalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { NbPageableCalendarHeaderComponent } from './components/calendar-header/pageable-calendar-header.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarWeekComponent } from './components/calendar-week/calendar-week.component';

import { NbNativeDateTimeUtilService } from './service/native-date-time-util.service';
import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarDatePipe } from './components/calendar-date.pipe';


const NB_CALENDAR_PROVIDERS = [
  NbNativeDateTimeUtilService,
  { provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService },
];

const COMPONENTS = [
  NbCalendarHeaderComponent,
  NbPageableCalendarHeaderComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarWeekComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarCellComponent,
];

const PIPES = [
  NbCalendarDatePipe,
];

@NgModule({
  imports: [NbSharedModule],
  exports: [...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...NB_CALENDAR_PROVIDERS],
})
export class NbCalendarSharedModule {

}
