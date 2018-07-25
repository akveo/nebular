import { Injectable } from '@angular/core';
import { NbDateTimeUtil } from './date-time-util';
import { NbCalendarCell, NbCalendarMonthBuilderContext } from '../model';
import { batch, range } from '../helpers';
import { NbCalendarCellStateService } from './calendar-cell-state.service';

@Injectable()
export class NbCalendarWeeksFactoryService<T> {

  private static DAYS_IN_WEEK: number = 7;

  constructor(protected dateTimeUtil: NbDateTimeUtil,
              protected cellStateService: NbCalendarCellStateService<T>) {
  }

  createWeeks(context: NbCalendarMonthBuilderContext<T>): NbCalendarCell[][] {
    const weeks = this.createDates(context);

    if (context.includeBoundingMonths) {
      this.addBoundingMonths(weeks, context);
    }

    return weeks.map(week => week.map((date: Date) => this.createCellWithState(date, context)));
  }

  private createDates(context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const days = this.createDaysRange(context.activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
    return batch(days, NbCalendarWeeksFactoryService.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private addBoundingMonths(weeks: Date[][], context: NbCalendarMonthBuilderContext<T>) {
    if (weeks[0].length < NbCalendarWeeksFactoryService.DAYS_IN_WEEK) {
      const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
      weeks[0].unshift(...this.createPrevBoundingDays(context.activeMonth, startOfWeekDayDiff));
    }
    if (weeks[weeks.length - 1].length < NbCalendarWeeksFactoryService.DAYS_IN_WEEK) {
      weeks[weeks.length - 1].push(...this.createNextBoundingDays(context.activeMonth));
    }
  }

  private createCellWithState(date: Date, context: NbCalendarMonthBuilderContext<T>): NbCalendarCell {
    const cell = { date, state: [] };
    this.cellStateService.assignStates(cell, context);
    return cell;
  }

  private createDaysRange(activeMonth: Date): Date[] {
    const year = this.dateTimeUtil.getYear(activeMonth);
    const month = this.dateTimeUtil.getMonth(activeMonth);
    const daysInMonth: number = this.dateTimeUtil.getNumberOfDaysInMonth(activeMonth);
    return range(daysInMonth).map(i => this.dateTimeUtil.createDate(year, month, i + 1));
  }

  private createPrevBoundingDays(activeMonth: Date, startOffset: number): Date[] {
    const month = this.dateTimeUtil.add(activeMonth, -1, 'm');
    const daysInMonth = this.dateTimeUtil.getNumberOfDaysInMonth(month);
    return this.createDaysRange(month).slice(daysInMonth - startOffset);
  }

  private createNextBoundingDays(activeMonth: Date): Date[] {
    const month = this.dateTimeUtil.add(activeMonth, 1, 'm');
    const firstDay = this.dateTimeUtil.getMonthStart(month);
    const weekStartOffset = 7 - this.dateTimeUtil.getWeekStartDiff(firstDay);
    return this.createDaysRange(month).slice(0, weekStartOffset);
  }

  private getStartOfWeekDayDiff(date: Date): number {
    const startOfMonth = this.dateTimeUtil.getMonthStart(date);
    return this.dateTimeUtil.getWeekStartDiff(startOfMonth);
  }
}
