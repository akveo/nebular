import { Injectable } from '@angular/core';
import { NbDateTimeUtil } from './date-time-util';
import { NbCalendarCell, NbCalendarMonthBuilderContext } from '../model';
import { batch, range } from '../helpers';
import { NbCalendarCellStateService } from './calendar-cell-state.service';

@Injectable()
export class NbCalendarWeeksFactoryService<D> {

  private static DAYS_IN_WEEK: number = 7;

  constructor(protected dateTimeUtil: NbDateTimeUtil<D>,
              protected cellStateService: NbCalendarCellStateService<D>) {
  }

  createWeeks(context: NbCalendarMonthBuilderContext<D>): NbCalendarCell<D>[][] {
    const days = this.createDaysRange(context.activeMonth);
    const startOfMonth = this.dateTimeUtil.getMonthStart(context.activeMonth);
    const startOfWeekDayDiff = this.dateTimeUtil.getWeekStartDiff(startOfMonth);
    const weeks = batch(days, NbCalendarWeeksFactoryService.DAYS_IN_WEEK, startOfWeekDayDiff);

    if (context.includeBoundingMonths) {
      if (weeks[0].length < NbCalendarWeeksFactoryService.DAYS_IN_WEEK) {
        weeks[0].unshift(...this.createPrevBoundingDays(context.activeMonth, startOfWeekDayDiff));
      }
      if (weeks[weeks.length - 1].length < NbCalendarWeeksFactoryService.DAYS_IN_WEEK) {
        weeks[weeks.length - 1].push(...this.createNextBoundingDays(context.activeMonth));
      }
    }

    return weeks.map(week => week.map((date: D) => this.createCellWithState(date, context)));
  }

  protected createCellWithState(date: D, context: NbCalendarMonthBuilderContext<D>): NbCalendarCell<D> {
    const cell = { date, state: [] };
    this.cellStateService.assignStates(cell, context);
    return cell;
  }

  private createDaysRange(activeMonth: D): D[] {
    const year = this.dateTimeUtil.getYear(activeMonth);
    const month = this.dateTimeUtil.getMonth(activeMonth);
    const daysInMonth: number = this.dateTimeUtil.getNumberOfDaysInMonth(activeMonth);
    return range(daysInMonth).map(i => this.dateTimeUtil.createDate(year, month, i + 1));
  }

  private createPrevBoundingDays(activeMonth: D, startOffset: number): D[] {
    const month = this.dateTimeUtil.add(activeMonth, -1, 'm');
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(month);
    return this.createDaysRange(month).slice(daysInMonth - startOffset);
  }

  private createNextBoundingDays(activeMonth: D): D[] {
    const month = this.dateTimeUtil.add(activeMonth, 1, 'm');
    const firstDay = this.dateTimeUtil.getMonthStart(month);
    const weekStartOffset = 7 - this.dateTimeUtil.getWeekStartDiff(firstDay);
    return this.createDaysRange(month).slice(0, weekStartOffset);
  }
}
