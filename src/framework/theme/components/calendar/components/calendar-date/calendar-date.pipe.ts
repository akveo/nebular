import { Pipe, PipeTransform } from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';

@Pipe({ name: 'nbCalendarDate' })
export class NbCalendarDatePipe implements PipeTransform {

  constructor(private dateTimeUtil: NbDateTimeUtil) {
  }

  transform(date: Date): string {
    return date ? `${this.dateTimeUtil.getMonthName(date)} ${this.dateTimeUtil.getYear(date)}` : '';
  }
}
