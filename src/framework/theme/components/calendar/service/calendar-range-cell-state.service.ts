import { Injectable } from '@angular/core';

import { NbCalendarCell, NbCalendarCellState, NbCalendarMonthBuilderContext } from '../model';
import { NbCalendarCellStateService } from './calendar-cell-state.service';

@Injectable()
export class NbCalendarRangeCellStateService<D> extends NbCalendarCellStateService<D> {

  protected assignSelectionTypeSpecificStates(cell: NbCalendarCell<D>, context: NbCalendarMonthBuilderContext<D>) {
    const { start, end } = context.selectedValue;
    const { date } = cell;

    if (start && end && this.isInRange(date, start, end)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE);
    }

    if (start && this.dateTimeUtil.isSameDay(date, start)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE_START);
    }

    if (start && end && this.dateTimeUtil.isSameDay(date, end)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE_END);
    }
  }

  private isInRange(date: D, start: D, end: D): boolean {
    return this.dateTimeUtil.compareDates(date, start) > 0
      && this.dateTimeUtil.compareDates(date, end) < 0;
  }
}
