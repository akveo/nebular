/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, NgModule, Type } from '@angular/core';

import { NB_DATE_TRANSFORMER, NbDatepickerDirective, NbDateTransformer } from './datepicker.directive';
import { NbOverlayModule } from '../cdk';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { DatePipe } from '@angular/common';
import { NbCalendarRange, NbCalendarRangeComponent } from '@nebular/theme';

@Injectable()
export class NbDateTransformerService extends NbDateTransformer<Date> {
  picker: Type<NbDatepickerComponent> = NbDatepickerComponent;

  constructor(protected datePipe: DatePipe) {
    super();
  }

  fromString(value: string): Date {
    return undefined;
  }

  fromValue(value: Date): string {
    return this.datePipe.transform(value);
  }
}

@Injectable()
export class NbRangeTransformerService extends NbDateTransformer<NbCalendarRange> {
  picker: Type<NbRangepickerComponent> = NbRangepickerComponent;

  constructor(protected datePipe: DatePipe) {
    super();
  }

  fromString(value: string): NbCalendarRange {
    return undefined;
  }

  fromValue(range: NbCalendarRange): string {
    return `${this.datePipe.transform(range.start)} - ${this.datePipe.transform(range.end)}`;
  }
}

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


