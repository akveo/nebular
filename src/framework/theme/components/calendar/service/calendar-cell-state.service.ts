import { Injectable } from '@angular/core';

import { NbCalendarCell, NbCalendarCellState, NbCalendarMonthBuilderContext, NbCalendarRange } from '../model';
import { NbDateTimeUtil } from './date-time-util';

export abstract class NbCalendarCellStateService<T> {
  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    this.assignCommonStates(cell, context);

    if (!context.selectedValue) {
      return;
    }

    this.assignTypeSpecificStates(cell, context);
  }

  protected assignCommonStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    if (NbDateTimeUtil.isSameDay(cell.date, context.today)) {
      cell.state.push(NbCalendarCellState.TODAY);
    }

    if (!NbDateTimeUtil.isSameMonth(cell.date, context.activeMonth)) {
      cell.state.push(NbCalendarCellState.BOUNDING_MONTH);
    }
  }

  protected abstract assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>);
}

@Injectable()
export class NbCalendarBaseCellStateService extends NbCalendarCellStateService<Date> {
  protected assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<Date>) {
    if (NbDateTimeUtil.isSameDay(cell.date, context.selectedValue)) {
      cell.state.push(NbCalendarCellState.SELECTED);
    }
  }
}

@Injectable()
export class NbCalendarRangeCellStateService extends NbCalendarCellStateService<NbCalendarRange> {

  protected assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<NbCalendarRange>) {
    const { start, end } = context.selectedValue;
    const { date } = cell;

    if (start && end && NbDateTimeUtil.isBetween(date, start, end)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE);
    }

    if (start && NbDateTimeUtil.isSameDay(date, start)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE_START);
    }

    if (start && end && NbDateTimeUtil.isSameDay(date, end)) {
      cell.state.push(NbCalendarCellState.SELECTED_RANGE_END);
    }
  }
}
