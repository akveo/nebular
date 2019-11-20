/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NB_DATE_ADAPTER, NbDatepickerDirective } from './datepicker.directive';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbDatepickerComponent, NbRangepickerComponent, NbBasePickerComponent } from './datepicker.component';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarRangeModule } from '../calendar/calendar-range.module';
import { NbDateAdapterService, NbRangeAdapterService } from './datepicker-adapter';


@NgModule({
  imports: [NbOverlayModule, NbCalendarModule, NbCalendarRangeModule],
  exports: [NbDatepickerDirective, NbDatepickerComponent, NbRangepickerComponent],
  declarations: [
    NbDatepickerDirective,
    NbDatepickerContainerComponent,
    NbDatepickerComponent,
    NbRangepickerComponent,
    NbBasePickerComponent,
  ],
  entryComponents: [NbCalendarComponent, NbCalendarRangeComponent, NbDatepickerContainerComponent],
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
      ],
    };
  }
}
