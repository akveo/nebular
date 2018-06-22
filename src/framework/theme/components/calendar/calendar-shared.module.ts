/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarMonthViewComponent } from './components/calendar-month-view/calendar-month-view.component';
import { NbNativeDateTimeUtilService } from './service/native-date-time-util.service';
import { NbDateTimeUtil } from './service/date-time-util.interface';
import { NbCalendarCellViewComponent } from './components/callendar-cell-view/calendar-cell-view.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarDatePipe } from './helpers/calendar-date.pipe';
import { NbCalendarYearPipe } from './helpers/calendar-year.pipe';
import { NbArrayHelper } from './helpers/array.helper';

const NB_CALENDAR_PROVIDERS = [
  NbNativeDateTimeUtilService,
  { provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService },
];

const COMPONENTS = [
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarCellViewComponent,
];

const PIPES = [
  NbCalendarDatePipe,
  NbCalendarYearPipe,
];

@NgModule({
  imports: [ NbSharedModule ],
  exports: [ ...COMPONENTS, ...PIPES ],
  declarations: [ ...COMPONENTS, ...PIPES ],
  providers: [ ...NB_CALENDAR_PROVIDERS, NbArrayHelper ],
})
export class NbCalendarSharedModule {

}
