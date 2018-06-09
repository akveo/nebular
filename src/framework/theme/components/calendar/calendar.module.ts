/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarComponent } from './calendar.component';
import { NbCalendarMonthViewComponent } from './components/calendar-month-view/calendar-month-view.component';
import { NbCalendarModelFactoryService } from './models/calendar-model-factory.service';
import { NbNativeDateTimeUtilService } from './service/native-date-time-util.service';
import { NbDateTimeUtil } from './service/date-time-util.interface';
import { NbCheckboxModule } from '../checkbox/checkbox.module';
import { NbCalendarCellViewComponent } from './components/callendar-cell-view/calendar-cell-view.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarDatePipe } from './pipes/calendar-date.pipe';

const NB_CALENDAR_PROVIDERS = [
  NbCalendarModelFactoryService,
  NbNativeDateTimeUtilService,
  { provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService },
];

const COMPONENTS = [
  NbCalendarComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarCellViewComponent,
];

const PIPES = [
  NbCalendarDatePipe,
];

@NgModule({
  imports: [ NbSharedModule, NbCheckboxModule ],
  exports: [ ...COMPONENTS, ...PIPES ],
  declarations: [ ...COMPONENTS, ...PIPES ],
})
export class NbCalendarModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NbCalendarModule,
      providers: [
        ...NB_CALENDAR_PROVIDERS,
      ],
    };
  }
}
