import { Injectable } from '@angular/core';

import { NbCalendarCell, NbCalendarCellState, NbCalendarMonthBuilderContext, NbCalendarRange } from '../model';
import { NbDateTimeUtil } from './date-time-util';

export abstract class NbCalendarCellStateService<T> {
  protected constructor(protected dateTimeUtil: NbDateTimeUtil) {
  }

  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    this.assignCommonStates(cell, context);

    if (!context.selectedValue) {
      return;
    }

    this.assignTypeSpecificStates(cell, context);
  }

  protected assignCommonStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>) {
    if (this.dateTimeUtil.isSameDay(cell.date, context.today)) {
      cell.state.push(NbCalendarCellState.TODAY);
    }

    if (!this.dateTimeUtil.isSameMonth(cell.date, context.activeMonth)) {
      cell.state.push(NbCalendarCellState.BOUNDING_MONTH);
    }
  }

  protected abstract assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<T>);
}

@Injectable()
export class NbCalendarBaseCellStateService extends NbCalendarCellStateService<Date> {
  constructor(protected dateTimeUtil: NbDateTimeUtil) {
    super(dateTimeUtil);
  }

  protected assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<Date>) {
    if (this.dateTimeUtil.isSameDay(cell.date, context.selectedValue)) {
      cell.state.push(NbCalendarCellState.SELECTED);
    }
  }
}

@Injectable()
export class NbCalendarRangeCellStateService extends NbCalendarCellStateService<NbCalendarRange> {

  constructor(protected dateTimeUtil: NbDateTimeUtil) {
    super(dateTimeUtil);
  }

  protected assignTypeSpecificStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<NbCalendarRange>) {
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

  private isInRange(date: Date, start: Date, end: Date): boolean {
    return this.dateTimeUtil.compareDates(date, start) > 0
      && this.dateTimeUtil.compareDates(date, end) < 0;
  }
}
