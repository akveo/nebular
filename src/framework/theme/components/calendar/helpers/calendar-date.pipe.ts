import { Pipe, PipeTransform } from '@angular/core';

import { NbDateTimeUtil } from '../service/date-time-util.interface';

@Pipe({ name: 'nbCalendarDate' })
export class NbCalendarDatePipe<D> implements PipeTransform {

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  transform(date: any): string {
    return date ? `${this.dateTimeUtil.getMonthName(date)}, ${this.dateTimeUtil.getYear(date)}` : '';
  }
}
