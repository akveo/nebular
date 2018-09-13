/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Type } from '@angular/core';

import { NbCalendarRange } from '../calendar/calendar-range.component';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbDateTransformer } from './datepicker.directive';
import { NbDateService } from '../calendar-kit';


@Injectable()
export class NbDateTransformerService<D> extends NbDateTransformer<D> {
  picker: Type<NbDatepickerComponent<D>> = NbDatepickerComponent;

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  parse(date: string, format): D {
    return this.dateService.parse(date, format);
  }

  format(date: D, format: string): string {
    return this.dateService.format(date, format);
  }
}

@Injectable()
export class NbRangeTransformerService<D> extends NbDateTransformer<NbCalendarRange<D>> {
  picker: Type<NbRangepickerComponent<D>> = NbRangepickerComponent;

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  parse(date: string, format): NbCalendarRange<D> {
    const [start, end] = date.split('-').map(subDate => subDate.trim());
    return {
      start: this.dateService.parse(start, format),
      end: this.dateService.parse(end, format),
    };
  }

  format(range: NbCalendarRange<D>, format: string): string {
    return `${this.dateService.format(range.start, format)} - ${this.dateService.format(range.end, format)}`;
  }
}
