import { Injectable } from '@angular/core';
import { NbCalendarCell, NbCalendarCellState, NbCalendarMonthBuilderContext } from '../model';
import { NbDateTimeUtil } from './date-time-util';

@Injectable()
export class NbCalendarCellStateService<D> {
  constructor(protected dateTimeUtil: NbDateTimeUtil<D>) {
  }

  assignStates(cell: NbCalendarCell<D>, context: NbCalendarMonthBuilderContext<D>) {
    this.assignCommonStates(cell, context);

    if (!context.selectedValue) {
      return;
    }

    this.assignSelectionTypeSpecificStates(cell, context);
  }

  protected assignCommonStates(cell: NbCalendarCell<D>, context: NbCalendarMonthBuilderContext<D>) {
    if (this.dateTimeUtil.isSameDay(cell.date, context.today)) {
      cell.state.push(NbCalendarCellState.TODAY);
    }

    if (!this.dateTimeUtil.isSameMonth(cell.date, context.activeMonth)) {
      cell.state.push(NbCalendarCellState.BOUNDING_MONTH);
    }
  }

  protected assignSelectionTypeSpecificStates(cell: NbCalendarCell<D>, context: NbCalendarMonthBuilderContext<D>) {
    if (this.dateTimeUtil.isSameDay(cell.date, context.selectedValue)) {
      cell.state.push(NbCalendarCellState.SELECTED);
    }
  }
}
