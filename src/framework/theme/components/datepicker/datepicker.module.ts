/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DatePipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbCalendarKitModule } from '../calendar-kit/calendar-kit.module';
import { NbBaseCalendarModule } from '../calendar/base-calendar.module';
import { NbCalendarRangeModule } from '../calendar/calendar-range.module';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCardModule } from '../card/card.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbTimepickerModule } from '../timepicker/timepicker.module';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbDateTimePickerComponent } from './date-timepicker.component';
import { NbDateAdapterService, NbDateTimeAdapterService, NbRangeAdapterService } from './datepicker-adapter';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbBasePickerComponent, NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NB_DATE_ADAPTER, NbDatepickerDirective } from './datepicker.directive';

@NgModule({
  imports: [
    NbOverlayModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbCardModule,
    NbBaseCalendarModule,
    NbTimepickerModule,
    NbCalendarKitModule,
  ],
  exports: [
    NbDatepickerDirective,
    NbDatepickerComponent,
    NbRangepickerComponent,
    NbDateTimePickerComponent,
    NbCalendarWithTimeComponent,
  ],
  declarations: [
    NbDatepickerDirective,
    NbDatepickerContainerComponent,
    NbCalendarWithTimeComponent,
    NbDateTimePickerComponent,
    NbDatepickerComponent,
    NbRangepickerComponent,
    NbBasePickerComponent,
  ],
})
export class NbDatepickerModule {
  static forRoot(): ModuleWithProviders<NbDatepickerModule> {
    return {
      ngModule: NbDatepickerModule,
      providers: [
        DatePipe,
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbDateAdapterService,
        },
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbRangeAdapterService,
        },
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbDateTimeAdapterService,
        },
      ],
    };
  }
}
