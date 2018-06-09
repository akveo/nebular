import { NbCalendarModelFactoryService } from './calendar-model-factory.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NbCalendarRangeModelFactoryService<D> extends NbCalendarModelFactoryService<D> {

  protected _getStatesForCell(monthSettings, year, month, date) {
    const states = this._getBasicStatesForCell(monthSettings, year, month, date);
    const { context } = monthSettings;

    if (context.selectedValue) {
      const sv = context.selectedValue;

      if (
        sv.startDate &&
        sv.endDate &&
        (
          !(
            year < this.dateTimeUtil.getYear(sv.startDate) ||
            month < this.dateTimeUtil.getMonth(sv.startDate) ||
            date <= this.dateTimeUtil.getDate(sv.startDate)
          ) &&
          !(
            year > this.dateTimeUtil.getYear(sv.endDate) ||
            month > this.dateTimeUtil.getMonth(sv.endDate) ||
            date >= this.dateTimeUtil.getDate(sv.endDate)
          )
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

}
