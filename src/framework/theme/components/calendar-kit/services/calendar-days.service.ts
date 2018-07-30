/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { NbDateTimeUtil } from './date-time-util';
import { NbCalendarMonthBuilderContext } from '../model';
import { batch } from '../helpers';
import { NbLocaleService } from './locale.service';

@Injectable()
export class NbCalendarDaysService<T> {

  constructor(protected locale: NbLocaleService) {
  }

  createWeeks(context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const weeks = this.createDates(context);
    return this.withBoundingMonths(weeks, context);
  }

  private createDates(context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const days = NbDateTimeUtil.createDateRangeForMonth(context.activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
    return batch(days, NbDateTimeUtil.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private withBoundingMonths(weeks: Date[][], context: NbCalendarMonthBuilderContext<T>): Date[][] {
    let withBoundingMonths = weeks;

    if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, context);
    }

    if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, context);
    }

    return withBoundingMonths;
  }

  private addPrevBoundingMonth(weeks: Date[][], context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const firstWeek = weeks.shift();
    firstWeek.unshift(...this.createPrevBoundingDays(context));
    return [firstWeek, ...weeks];
  }

  private addNextBoundingMonth(weeks: Date[][], context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const lastWeek = weeks.pop();
    lastWeek.push(...this.createNextBoundingDays(context));
    return [...weeks, lastWeek];
  }

  private createPrevBoundingDays(context: NbCalendarMonthBuilderContext<T>): Date[] {
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
    const month = NbDateTimeUtil.addMonth(context.activeMonth, -1);
    const daysInMonth = NbDateTimeUtil.getNumberOfDaysInMonth(month);
    return NbDateTimeUtil.createDateRangeForMonth(month)
      .slice(daysInMonth - startOfWeekDayDiff)
      .map(date => context.includeBoundingMonths ? date : null);
  }

  private createNextBoundingDays(context: NbCalendarMonthBuilderContext<T>): Date[] {
    const month = NbDateTimeUtil.addMonth(context.activeMonth, 1);
    const firstDay = NbDateTimeUtil.getMonthStart(month);
    const weekStartOffset = 7 - this.getWeekStartDiff(firstDay);
    return NbDateTimeUtil.createDateRangeForMonth(month)
      .slice(0, weekStartOffset)
      .map(date => context.includeBoundingMonths ? date : null);
  }

  private getStartOfWeekDayDiff(date: Date): number {
    const startOfMonth = NbDateTimeUtil.getMonthStart(date);
    return this.getWeekStartDiff(startOfMonth);
  }

  private getWeekStartDiff(date: Date): number {
    return (7 - this.locale.getFirstDayOfWeek() + date.getDay()) % 7;
  }

  private isShouldAddPrevBoundingMonth(weeks: Date[][]): boolean {
    return weeks[0].length < NbDateTimeUtil.DAYS_IN_WEEK;
  }

  private isShouldAddNextBoundingMonth(weeks: Date[][]): boolean {
    return weeks[weeks.length - 1].length < NbDateTimeUtil.DAYS_IN_WEEK;
  }
}
