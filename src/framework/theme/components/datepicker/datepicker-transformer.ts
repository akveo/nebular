/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Type } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NbCalendarRange } from '../calendar/calendar-range.component';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbDateTransformer } from './datepicker.directive';


@Injectable()
export class NbDateTransformerService extends NbDateTransformer<Date> {
  picker: Type<NbDatepickerComponent> = NbDatepickerComponent;

  constructor(protected datePipe: DatePipe) {
    super();
  }

  fromString(value: string): Date {
    return new Date(Date.parse(value));
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

