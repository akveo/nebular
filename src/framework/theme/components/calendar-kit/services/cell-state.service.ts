import { Injectable } from '@angular/core';

import { NbCalendarCell, NbCalendarCellState, NbCalendarMonthBuilderContext } from '../model';
import { NbDateTimeUtil } from './date-time-util';

@Injectable()
export class NbCellStateService<T> {
  today = new Date();

  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    if (NbDateTimeUtil.isSameDay(cell.date, this.today)) {
      cell.state.push(NbCalendarCellState.TODAY);
    }

    if (!NbDateTimeUtil.isSameMonth(cell.date, context.activeMonth)) {
      cell.state.push(NbCalendarCellState.BOUNDING_MONTH);
    }
  }
}
