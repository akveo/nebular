import { Injectable, Optional } from '@angular/core';
import { NbDateTimeUtil } from '../service/date-time-util.interface';
import { NbCalendarCellModel } from './calendar-cell.model';
import { NbCalendarWeekModel } from './calendar-week.model';
import { NbCalendarMonthModel } from './calendar-month.model';

@Injectable()
export class NbCalendarModelFactoryService<D> {

  constructor(
    @Optional() public dateTimeUtil: NbDateTimeUtil<D>,
  ) {}

  createMonthModel(
    date: D,
    includeBoundingMonths: boolean = false,
    todayDate: D,
  ): NbCalendarMonthModel {
    const monthSettings = this._getMonthSettings(date, todayDate);

    const firstWeekData = this._createFirstWeekMonthModel(monthSettings, includeBoundingMonths);
    const fullWeeksData = this._createFullWeekModels(monthSettings, firstWeekData.currentDate);
    const lastWeekData = this._createLastWeekModel(monthSettings, fullWeeksData.currentDate, includeBoundingMonths);

    return new NbCalendarMonthModel(
      [ ...firstWeekData.monthModel, ...fullWeeksData.monthModel, ...lastWeekData.monthModel ],
      this._getMonthStates(date, monthSettings),
    );
  }

  private _getMonthStates(date, monthSettings) {
    const states = [];

    if (this.dateTimeUtil.isSameMonth(date, monthSettings.todayDate)) {
      states.push('current-month');
    }
    return states;
  }

  private _getMonthSettings(date: D, todayDate: D) {
    const startOfMonth = this.dateTimeUtil.getMonthStart(date);
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(date);
    const startOfWeekDayDiff = this.dateTimeUtil.getWeekStartDiff(startOfMonth);
    const numberOfDaysInFirstWeekOfMonth = 7 - startOfWeekDayDiff;

    return { startOfMonth, daysInMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth, todayDate };
  }

  private _createFirstWeekMonthModel(monthSettings, includeBoundingMonths) {
    const monthModel = [];
    const { startOfMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth } = monthSettings;

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

    if (includeBoundingMonths) {
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

  private _createLastWeekModel(monthSettings, currentDate, includeBoundingMonths) {
    const monthModel = [];
    const { startOfMonth, daysInMonth } = monthSettings;

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
      if (includeBoundingMonths) {
        const nextMonthStart = this.dateTimeUtil.add(startOfMonth, 1, 'm');
        for (let nextMonthDay = 1; nextMonthDay <= additionalDaysInNewMonth; nextMonthDay++) {
          lastWeek.push(
            new NbCalendarCellModel(
              year,
              month,
              nextMonthDay,
              1,
              this._getStatesForCell(monthSettings, year, month, nextMonthDay),
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

  private _getStatesForCell(monthSettings, year, month, date) {
    const states = [];

    if (
      year === this.dateTimeUtil.getYear(monthSettings.todayDate) &&
      month === this.dateTimeUtil.getMonth(monthSettings.todayDate) &&
      date === this.dateTimeUtil.getDate(monthSettings.todayDate)
    ) {
      states.push('cell-today');
    }

    return states;
  }

}
