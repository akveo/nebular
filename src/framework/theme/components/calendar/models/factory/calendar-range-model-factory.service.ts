import { NbCalendarModelFactoryService } from './calendar-model-factory.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NbCalendarRangeModelFactoryService<D> extends NbCalendarModelFactoryService<D> {

  protected getStatesForCell(monthSettings, year, month, date) {
    const states = this.getBasicStatesForCell(monthSettings, year, month, date);
    const { context } = monthSettings;

    if (context.selectedValue) {
      const sv = context.selectedValue;

      if (
        sv.startDate &&
        sv.endDate &&
        (
          this.compareDateAndNumberRepresentation(sv.startDate, year, month, date) <= 0 &&
          this.compareDateAndNumberRepresentation(sv.endDate, year, month, date) >= 0
        )
      ) {
        states.push('cell-range-inbetween');
      }

      if (sv.startDate &&
        year === this.dateTimeUtil.getYear(sv.startDate) &&
        month === this.dateTimeUtil.getMonth(sv.startDate) &&
        date === this.dateTimeUtil.getDate(sv.startDate)
      ) {
        states.push.apply(states, ['cell-selected', 'cell-selected-range', 'cell-selected-range-start']);
      }

      if (sv.endDate &&
        year === this.dateTimeUtil.getYear(sv.endDate) &&
        month === this.dateTimeUtil.getMonth(sv.endDate) &&
        date === this.dateTimeUtil.getDate(sv.endDate)
      ) {
        states.push.apply(states, ['cell-selected', 'cell-selected-range', 'cell-selected-range-end']);
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
