import { Pipe, PipeTransform } from '@angular/core';

import { NbDateTimeUtil } from '../service/date-time-util.interface';

@Pipe({ name: 'nbCalendarYear' })
export class NbCalendarYearPipe<D> implements PipeTransform {

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  transform(date: any): string {
    return date ? this.dateTimeUtil.getYear(date).toString() : '';
  }
}
