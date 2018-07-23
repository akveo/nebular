import { NbCalendarModelFactoryService } from './calendar-model-factory.service';
import { Injectable } from '@angular/core';
import { NbCalendarCellState } from '@nebular/theme/components/calendar/model';

@Injectable()
export class NbCalendarRangeModelFactoryService<D> extends NbCalendarModelFactoryService<D> {

  protected getStatesForCell(monthSettings, year, month, date) {
    const states = this.getBasicStatesForCell(monthSettings, year, month, date);
    const { context } = monthSettings;

    if (context.selectedValue) {
      const sv = context.selectedValue;

      if (
        sv.start &&
        sv.end &&
        (
          this.compareDateAndNumberRepresentation(sv.start, year, month, date) <= 0 &&
          this.compareDateAndNumberRepresentation(sv.end, year, month, date) >= 0
        )
      ) {
        states.push(NbCalendarCellState.IN_RANGE);
      }

      if (sv.start &&
        year === this.dateTimeUtil.getYear(sv.start) &&
        month === this.dateTimeUtil.getMonth(sv.start) &&
        date === this.dateTimeUtil.getDate(sv.start)
      ) {
        states.push(
          NbCalendarCellState.SELECTED,
          NbCalendarCellState.SELECTED_RANGE,
          NbCalendarCellState.SELECTED_RANGE_START,
        );
      }

      if (sv.end &&
        year === this.dateTimeUtil.getYear(sv.end) &&
        month === this.dateTimeUtil.getMonth(sv.end) &&
        date === this.dateTimeUtil.getDate(sv.end)
      ) {
        states.push(
          NbCalendarCellState.SELECTED,
          NbCalendarCellState.SELECTED_RANGE,
          NbCalendarCellState.SELECTED_RANGE_END,
        );
      }
    }

    return states;
  }

  private compareDateAndNumberRepresentation(date: D, year2, month2, date2) {
    const year1 = this.dateTimeUtil.getYear(date);
    const month1 = this.dateTimeUtil.getMonth(date);
    const date1 = this.dateTimeUtil.getDate(date);
    return (year1 - year2) || (month1 - month2) || (date1 - date2);
  }

}
