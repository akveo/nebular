import { Injectable } from '@angular/core';

import {
  NbCellStateService,
  NbCalendarCell,
  NbCalendarCellState,
  NbCalendarMonthBuilderContext,
  NbDateTimeUtil,
} from '../calendar-kit';

@Injectable()
export class NbCalendarCellStateService extends NbCellStateService<Date> {
  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<Date>) {
    super.assignStates(cell, context);

    if (context.selectedValue && NbDateTimeUtil.isSameDay(cell.date, context.selectedValue)) {
      cell.state.push(NbCalendarCellState.SELECTED);
    }
  }
}
