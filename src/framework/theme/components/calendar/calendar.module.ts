/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarComponent } from './calendar.component';
import { NbCalendarMonthViewComponent } from './partials/calendar-month-view.component';
import { NbCalendarModelFactoryService } from './models/calendar-model-factory.service';
import { NbNativeDateTimeUtilService } from './service/native-date-time-util.service';
import { NbDateTimeUtil } from './service/date-time-util.interface';
import { NbCheckboxModule } from '../checkbox/checkbox.module';
import { NbCalendarCellViewComponent } from './partials/calendar-cell-view.component';

const NB_CALENDAR_PROVIDERS = [
  NbCalendarModelFactoryService,
  NbNativeDateTimeUtilService,
  { provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService },
];

@NgModule({
  imports: [ NbSharedModule, NbCheckboxModule ],
  exports: [ NbCalendarComponent, NbCalendarMonthViewComponent, NbCalendarCellViewComponent ],
  declarations: [ NbCalendarComponent, NbCalendarMonthViewComponent, NbCalendarCellViewComponent ],
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
