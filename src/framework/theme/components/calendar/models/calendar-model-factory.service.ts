import { Injectable, Optional } from '@angular/core';
import { NbDateTimeUtil } from '../service/date-time-util.interface';
import { NbCalendarCellModel } from '@nebular/theme/components/calendar/models/calendar-cell.model';
import { NbCalendarWeekModel } from '@nebular/theme/components/calendar/models/calendar-week.model';

@Injectable()
export class NbCalendarModelFactoryService<D> {

  constructor(
    @Optional() public dateTimeUtil: NbDateTimeUtil<D>,
  ) {}

  createMonthModel(date: D, includeBoundingMonths: boolean = false) {
    const monthSettings = this._getMonthSettings(date);

    const firstWeekData = this._createFirstWeekMonthModel(monthSettings, includeBoundingMonths);
    const fullWeeksData = this._createFullWeekModels(monthSettings, firstWeekData.currentDate);
    const lastWeekData = this._createLastWeekModel(monthSettings, fullWeeksData.currentDate, includeBoundingMonths);

    return [ ...firstWeekData.monthModel, ...fullWeeksData.monthModel, ...lastWeekData.monthModel ];
  }

  private _getMonthSettings(date: D) {
    const startOfMonth = this.dateTimeUtil.getMonthStart(date);
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(date);
    const startOfWeekDayDiff = this.dateTimeUtil.getWeekStartDiff(startOfMonth);
    const numberOfDaysInFirstWeekOfMonth = 7 - startOfWeekDayDiff;

    return { startOfMonth, daysInMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth };
  }

  private _createFirstWeekMonthModel(monthSettings, includeBoundingMonths) {
    const monthModel = [];
    const { startOfMonth, startOfWeekDayDiff, numberOfDaysInFirstWeekOfMonth } = monthSettings;

    const firstWeek = [];
    let currentDate = this.dateTimeUtil.getDate(startOfMonth);
    for (let firstWeekDate = currentDate; firstWeekDate <= numberOfDaysInFirstWeekOfMonth; firstWeekDate++) {
      firstWeek.push(
        new NbCalendarCellModel(
          this.dateTimeUtil.getYear(startOfMonth),
          this.dateTimeUtil.getMonth(startOfMonth),
          firstWeekDate,
        ),
      );
      currentDate = firstWeekDate;
    }

    if (includeBoundingMonths) {
      const startOfWeek = this.dateTimeUtil.getWeekStart(startOfMonth);
      for (let leftBoundingMonthDay = startOfWeekDayDiff - 1; leftBoundingMonthDay >= 0; leftBoundingMonthDay--) {
        firstWeek.unshift(
          new NbCalendarCellModel(
            this.dateTimeUtil.getYear(startOfWeek),
            this.dateTimeUtil.getMonth(startOfWeek),
            this.dateTimeUtil.getDate(startOfWeek) + leftBoundingMonthDay,
            -1,
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

    for (let fullWeek = 0; fullWeek < Math.floor((daysInMonth - numberOfDaysInFirstWeekOfMonth) / 7 ); fullWeek++) {
      const currentWeekCells = [];
      currentDate = currentDate + 1;
      currentWeekCells.push(
        new NbCalendarCellModel(
          this.dateTimeUtil.getYear(startOfMonth),
          this.dateTimeUtil.getMonth(startOfMonth),
          currentDate,
        ),
      );

      for (let fullWeekDate = currentDate + 1;
           (currentDate - numberOfDaysInFirstWeekOfMonth) % 7; fullWeekDate++) {
        currentWeekCells.push(
          new NbCalendarCellModel(
            this.dateTimeUtil.getYear(startOfMonth),
            this.dateTimeUtil.getMonth(startOfMonth),
            fullWeekDate,
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
      for (let lastWeekDate = currentDate + 1; lastWeekDate <= daysInMonth; lastWeekDate++) {
        lastWeek.push(
          new NbCalendarCellModel(
            this.dateTimeUtil.getYear(startOfMonth),
            this.dateTimeUtil.getMonth(startOfMonth),
            lastWeekDate,
          ),
        );
      }
      if (includeBoundingMonths) {
        const nextMonthStart = this.dateTimeUtil.add(startOfMonth, 1, 'm');
        for (let nextMonthDay = 1; nextMonthDay <= additionalDaysInNewMonth; nextMonthDay++) {
          lastWeek.push(
            new NbCalendarCellModel(
              this.dateTimeUtil.getYear(nextMonthStart),
              this.dateTimeUtil.getMonth(nextMonthStart),
              nextMonthDay,
              1,
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

}
