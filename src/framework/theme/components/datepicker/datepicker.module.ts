/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NB_DATE_TRANSFORMER, NbDatepickerDirective } from './datepicker.directive';
import { NbOverlayModule } from '../cdk';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbDateTransformerService, NbRangeTransformerService } from './datepicker-transformer';


@NgModule({
  imports: [NbOverlayModule, NbCalendarModule],
  exports: [NbDatepickerDirective, NbDatepickerComponent, NbRangepickerComponent],
  declarations: [NbDatepickerDirective, NbDatepickerContainerComponent, NbDatepickerComponent, NbRangepickerComponent],
  entryComponents: [NbCalendarComponent, NbCalendarRangeComponent, NbDatepickerContainerComponent],
  providers: [
    DatePipe,
    {
      provide: NB_DATE_TRANSFORMER,
      multi: true,
      useClass: NbDateTransformerService,
    },
    {
      provide: NB_DATE_TRANSFORMER,
      multi: true,
      useClass: NbRangeTransformerService,
    },
  ],
})
export class NbDatepickerModule {
}


