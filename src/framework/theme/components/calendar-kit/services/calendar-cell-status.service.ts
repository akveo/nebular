import { Injectable } from '@angular/core';

import { NbCalendarCell, NbCalendarCellStatus, NbCalendarMonthBuilderContext } from '../model';
import { NbDateTimeUtil } from './date-time-util';

@Injectable()
export class NbCalendarCellStatusService<T> {
  today = new Date();

  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    if (NbDateTimeUtil.isSameDay(cell.date, this.today)) {
      cell.status.push(NbCalendarCellStatus.TODAY);
    }

    if (!NbDateTimeUtil.isSameMonth(cell.date, context.activeMonth)) {
      cell.status.push(NbCalendarCellStatus.BOUNDING_MONTH);
    }
  }
}
