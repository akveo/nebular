import { Injectable } from '@angular/core';
import { NbDateTimeUtil } from './date-time-util';
import { NbCalendarCell, NbCalendarMonth, NbCalendarMonthBuilderContext, NbCalendarWeek } from '../model';

@Injectable()
export class NbCalendarModelFactoryServiceDeprecated<D> {

  constructor(protected dateTimeUtil: NbDateTimeUtil<D>) {
  }

  createMonthModel(context: NbCalendarMonthBuilderContext<D>): NbCalendarMonth {
    const monthSettings = this.getMonthSettings(context);

    const firstWeekData = this.createFirstWeekMonthModel(monthSettings);
    const fullWeeksData = this.createFullWeekModels(monthSettings, firstWeekData.currentDate);
    const lastWeekData = this.createLastWeekModel(monthSettings, fullWeeksData.currentDate);

    return {
      weeks: [...firstWeekData.monthModel, ...fullWeeksData.monthModel, ...lastWeekData.monthModel],
      monthStates: this.getMonthStates(monthSettings),
    };
  }

  protected getBasicStatesForCell({ context }, year, month, date) {
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

    return states;
  }

  protected getStatesForCell(monthSettings, year, month, date) {
    const states = this.getBasicStatesForCell(monthSettings, year, month, date);
    const { context } = monthSettings;

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

  private getMonthStates({ context }) {
    const states = [];

    if (this.dateTimeUtil.isSameMonth(context.activeMonth, context.currentValue)) {
      states.push('current-month');
    }
    return states;
  }

  private getMonthSettings(context) {
    const startOfMonth = this.dateTimeUtil.getMonthStart(context.activeMonth);
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(context.activeMonth);
    const startOfWeekDayDiff = this.dateTimeUtil.getWeekStartDiff(startOfMonth);
    const numberOfDaysInFirstWeekOfMonth = 7 - startOfWeekDayDiff;

    return { startOfMonth, daysInMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth, context };
  }

  private createFirstWeekMonthModel(monthSettings) {
    const monthModel: NbCalendarWeek[] = [];
    const { startOfMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth, context } = monthSettings;

    const firstWeek: NbCalendarCell[] = [];
    let currentDate = this.dateTimeUtil.getDate(startOfMonth);
    for (let firstWeekDate = currentDate; firstWeekDate <= numberOfDaysInFirstWeekOfMonth; firstWeekDate++) {
      const year = this.dateTimeUtil.getYear(startOfMonth);
      const month = this.dateTimeUtil.getMonth(startOfMonth);

      firstWeek.push({
        year: this.dateTimeUtil.getYear(startOfMonth),
        month: this.dateTimeUtil.getMonth(startOfMonth),
        date: firstWeekDate,
        activeMonthDiff: 0,
        states: this.getStatesForCell(monthSettings, year, month, firstWeekDate),
      });
      currentDate = firstWeekDate;
    }

    if (context.includeBoundingMonths) {
      const startOfWeek = this.dateTimeUtil.getWeekStart(startOfMonth);
      const year = this.dateTimeUtil.getYear(startOfWeek);
      const month = this.dateTimeUtil.getMonth(startOfWeek);
      for (let leftBoundingMonthDay = startOfWeekDayDiff - 1; leftBoundingMonthDay >= 0; leftBoundingMonthDay--) {
        const date = this.dateTimeUtil.getDate(startOfWeek) + leftBoundingMonthDay;
        firstWeek.unshift({
          year,
          month,
          date,
          activeMonthDiff: -1,
          states: this.getStatesForCell(monthSettings, year, month, date),
        });
      }
      monthModel.push({ cells: firstWeek });
    } else {
      monthModel.push({
        cells: firstWeek,
        padLeft: startOfWeekDayDiff,
      });
    }

    return { monthModel, currentDate };
  }

  private createFullWeekModels(monthSettings, currentDate) {
    const monthModel: NbCalendarWeek[] = [];
    const { startOfMonth, daysInMonth, numberOfDaysInFirstWeekOfMonth } = monthSettings;
    const year = this.dateTimeUtil.getYear(startOfMonth);
    const month = this.dateTimeUtil.getMonth(startOfMonth);

    for (let fullWeek = 0; fullWeek < Math.floor((daysInMonth - numberOfDaysInFirstWeekOfMonth) / 7); fullWeek++) {
      const currentWeekCells: NbCalendarCell[] = [];
      currentDate = currentDate + 1;
      currentWeekCells.push({
        year,
        month,
        date: currentDate,
        activeMonthDiff: 0,
        states: this.getStatesForCell(monthSettings, year, month, currentDate),
      });

      for (let fullWeekDate = currentDate + 1;
           (currentDate - numberOfDaysInFirstWeekOfMonth) % 7; fullWeekDate++) {
        currentWeekCells.push({
          year,
          month,
          date: fullWeekDate,
          activeMonthDiff: 0,
          states: this.getStatesForCell(monthSettings, year, month, fullWeekDate),
        });
        currentDate = fullWeekDate;
      }
      monthModel.push({ cells: currentWeekCells });
    }

    return { monthModel, currentDate };
  }

  private createLastWeekModel(monthSettings, currentDate) {
    const monthModel: NbCalendarWeek[] = [];
    const { startOfMonth, daysInMonth, context } = monthSettings;

    if (currentDate < daysInMonth) {
      const lastWeek: NbCalendarCell[] = [];
      const additionalDaysInNewMonth = 7 - (daysInMonth - currentDate);
      const year = this.dateTimeUtil.getYear(startOfMonth);
      const month = this.dateTimeUtil.getMonth(startOfMonth);
      for (let lastWeekDate = currentDate + 1; lastWeekDate <= daysInMonth; lastWeekDate++) {
        lastWeek.push({
          year,
          month,
          date: lastWeekDate,
          activeMonthDiff: 0,
          states: this.getStatesForCell(monthSettings, year, month, lastWeekDate),
        });
      }
      if (context.includeBoundingMonths) {
        const nextMonthStart = this.dateTimeUtil.add(startOfMonth, 1, 'm');
        const nextMonthYear = this.dateTimeUtil.getYear(nextMonthStart);
        const nextMonthMonth = this.dateTimeUtil.getMonth(nextMonthStart);
        for (let nextMonthDay = 1; nextMonthDay <= additionalDaysInNewMonth; nextMonthDay++) {
          lastWeek.push({
            year: nextMonthYear,
            month: nextMonthMonth,
            date: nextMonthDay,
            activeMonthDiff: 1,
            states: this.getStatesForCell(monthSettings, nextMonthYear, nextMonthMonth, nextMonthDay),
          });
        }
        monthModel.push({ cells: lastWeek });
      } else {
        monthModel.push({ cells: lastWeek, padLeft: 0, padRight: additionalDaysInNewMonth });
      }
    }

    return { monthModel };
  }

}

