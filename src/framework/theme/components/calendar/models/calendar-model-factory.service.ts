import { Injectable, Optional } from '@angular/core';
import { NbDateTimeUtil } from '../service/date-time-util.interface';
import { NbCalendarCellModel } from './calendar-cell.model';
import { NbCalendarWeekModel } from './calendar-week.model';
import { NbCalendarMonthModel } from './calendar-month.model';
import { NbCalendarMonthBuilderContext } from './calendar-month-builder-context';

@Injectable()
export class NbCalendarModelFactoryService<D> {

  constructor(
    @Optional() public dateTimeUtil: NbDateTimeUtil<D>,
  ) {}

  createMonthModel(context: NbCalendarMonthBuilderContext<D>): NbCalendarMonthModel {
    const monthSettings = this._getMonthSettings(context);

    const firstWeekData = this._createFirstWeekMonthModel(monthSettings);
    const fullWeeksData = this._createFullWeekModels(monthSettings, firstWeekData.currentDate);
    const lastWeekData = this._createLastWeekModel(monthSettings, fullWeeksData.currentDate);

    return new NbCalendarMonthModel(
      [ ...firstWeekData.monthModel, ...fullWeeksData.monthModel, ...lastWeekData.monthModel ],
      this._getMonthStates(monthSettings),
    );
  }

  private _getMonthStates({ context }) {
    const states = [];

    if (this.dateTimeUtil.isSameMonth(context.activeMonth, context.currentValue)) {
      states.push('current-month');
    }
    return states;
  }

  private _getMonthSettings(context) {
    const startOfMonth = this.dateTimeUtil.getMonthStart(context.activeMonth);
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(context.activeMonth);
    const startOfWeekDayDiff = this.dateTimeUtil.getWeekStartDiff(startOfMonth);
    const numberOfDaysInFirstWeekOfMonth = 7 - startOfWeekDayDiff;

    return { startOfMonth, daysInMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth, context };
  }

  private _createFirstWeekMonthModel(monthSettings) {
    const monthModel = [];
    const { startOfMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth, context } = monthSettings;

    const firstWeek = [];
    let currentDate = this.dateTimeUtil.getDate(startOfMonth);
    for (let firstWeekDate = currentDate; firstWeekDate <= numberOfDaysInFirstWeekOfMonth; firstWeekDate++) {
      const year = this.dateTimeUtil.getYear(startOfMonth);
      const month = this.dateTimeUtil.getMonth(startOfMonth);

      firstWeek.push(
        new NbCalendarCellModel(
          this.dateTimeUtil.getYear(startOfMonth),
          this.dateTimeUtil.getMonth(startOfMonth),
          firstWeekDate,
          0,
          this._getStatesForCell(monthSettings, year, month, firstWeekDate),
        ),
      );
      currentDate = firstWeekDate;
    }

    if (context.includeBoundingMonths) {
      const startOfWeek = this.dateTimeUtil.getWeekStart(startOfMonth);
      const year = this.dateTimeUtil.getYear(startOfWeek);
      const month = this.dateTimeUtil.getMonth(startOfWeek);
      for (let leftBoundingMonthDay = startOfWeekDayDiff - 1; leftBoundingMonthDay >= 0; leftBoundingMonthDay--) {
        const date = this.dateTimeUtil.getDate(startOfWeek) + leftBoundingMonthDay;
        firstWeek.unshift(
          new NbCalendarCellModel(
            year,
            month,
            date,
            -1,
            this._getStatesForCell(monthSettings, year, month, date),
          ),
        );
      }
      monthModel.push(new NbCalendarWeekModel(firstWeek));
    } else {
      monthModel.push(new NbCalendarWeekModel(firstWeek, startOfWeekDayDiff));
    }

    return { monthModel, currentDate };
  }

  private _createFullWeekModels(monthSettings, currentDate) {
    const monthModel = [];
    const { startOfMonth, daysInMonth, numberOfDaysInFirstWeekOfMonth } = monthSettings;
    const year = this.dateTimeUtil.getYear(startOfMonth);
    const month = this.dateTimeUtil.getMonth(startOfMonth);

    for (let fullWeek = 0; fullWeek < Math.floor((daysInMonth - numberOfDaysInFirstWeekOfMonth) / 7 ); fullWeek++) {
      const currentWeekCells = [];
      currentDate = currentDate + 1;
      currentWeekCells.push(
        new NbCalendarCellModel(
          year,
          month,
          currentDate,
          0,
          this._getStatesForCell(monthSettings, year, month, currentDate),
        ),
      );

      for (let fullWeekDate = currentDate + 1;
           (currentDate - numberOfDaysInFirstWeekOfMonth) % 7; fullWeekDate++) {
        currentWeekCells.push(
          new NbCalendarCellModel(
            year,
            month,
            fullWeekDate,
            0,
            this._getStatesForCell(monthSettings, year, month, fullWeekDate),
          ),
        );
        currentDate = fullWeekDate;
      }
      monthModel.push(new NbCalendarWeekModel(currentWeekCells));
    }

    return { monthModel, currentDate };
  }

  private _createLastWeekModel(monthSettings, currentDate) {
    const monthModel = [];
    const { startOfMonth, daysInMonth, context } = monthSettings;

    if (currentDate < daysInMonth) {
      const lastWeek = [];
      const additionalDaysInNewMonth = 7 - (daysInMonth - currentDate);
      const year = this.dateTimeUtil.getYear(startOfMonth);
      const month = this.dateTimeUtil.getMonth(startOfMonth);
      for (let lastWeekDate = currentDate + 1; lastWeekDate <= daysInMonth; lastWeekDate++) {
        lastWeek.push(
          new NbCalendarCellModel(
            year,
            month,
            lastWeekDate,
            0,
            this._getStatesForCell(monthSettings, year, month, lastWeekDate),
          ),
        );
      }
      if (context.includeBoundingMonths) {
        const nextMonthStart = this.dateTimeUtil.add(startOfMonth, 1, 'm');
        const nextMonthYear = this.dateTimeUtil.getYear(nextMonthStart);
        const nextMonthMonth = this.dateTimeUtil.getMonth(nextMonthStart);
        for (let nextMonthDay = 1; nextMonthDay <= additionalDaysInNewMonth; nextMonthDay++) {
          lastWeek.push(
            new NbCalendarCellModel(
              nextMonthYear,
              nextMonthMonth,
              nextMonthDay,
              1,
              this._getStatesForCell(monthSettings, nextMonthYear, nextMonthMonth, nextMonthDay),
            ),
          );
        }
        monthModel.push(new NbCalendarWeekModel(lastWeek));
      } else {
        monthModel.push(new NbCalendarWeekModel(lastWeek, 0, additionalDaysInNewMonth));
      }
    }

    return { monthModel };
  }

  private _getStatesForCell({ context }, year, month, date) {
    const states = [];

    if (
      year === this.dateTimeUtil.getYear(context.currentValue) &&
      month === this.dateTimeUtil.getMonth(context.currentValue) &&
      date === this.dateTimeUtil.getDate(context.currentValue)
    ) {
      states.push('cell-today');
    }

    if (
      year === this.dateTimeUtil.getYear(context.activeMonth) &&
      month !== this.dateTimeUtil.getMonth(context.activeMonth)
    ) {
      states.push('cell-bounding-month');
    }

    if (
      context.selectedValue &&
      year === this.dateTimeUtil.getYear(context.selectedValue) &&
      month === this.dateTimeUtil.getMonth(context.selectedValue) &&
      date === this.dateTimeUtil.getDate(context.selectedValue)
    ) {
      states.push('cell-selected');
    }

    return states;
  }

}
