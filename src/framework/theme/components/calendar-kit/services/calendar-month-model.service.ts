/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { NbDateTimeUtil } from './date-time-util';
import { NbLocaleService } from './locale.service';
import { batch } from '../helpers';


@Injectable()
export class NbCalendarMonthModelService {

  constructor(protected locale: NbLocaleService) {
  }

  createDaysGrid(activeMonth: Date, boundingMonth: boolean = true): Date[][] {
    const weeks = this.createDates(activeMonth);
    return this.withBoundingMonths(weeks, activeMonth, boundingMonth);
  }

  private createDates(activeMonth: Date): Date[][] {
    const days = NbDateTimeUtil.createDateRangeForMonth(activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(activeMonth);
    return batch(days, NbDateTimeUtil.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private withBoundingMonths(weeks: Date[][], activeMonth: Date, boundingMonth: boolean): Date[][] {
    let withBoundingMonths = weeks;

    if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    return withBoundingMonths;
  }

  private addPrevBoundingMonth(weeks: Date[][], activeMonth: Date, boundingMonth: boolean): Date[][] {
    const firstWeek = weeks.shift();
    const requiredItems: number = NbDateTimeUtil.DAYS_IN_WEEK - firstWeek.length;
    firstWeek.unshift(...this.createPrevBoundingDays(activeMonth, boundingMonth, requiredItems));
    return [firstWeek, ...weeks];
  }

  private addNextBoundingMonth(weeks: Date[][], activeMonth: Date, boundingMonth: boolean): Date[][] {
    const lastWeek = weeks.pop();
    const requiredItems: number = NbDateTimeUtil.DAYS_IN_WEEK - lastWeek.length;
    lastWeek.push(...this.createNextBoundingDays(activeMonth, boundingMonth, requiredItems));
    return [...weeks, lastWeek];
  }

  private createPrevBoundingDays(activeMonth: Date, boundingMonth: boolean, requiredItems: number): Date[] {
    const month = NbDateTimeUtil.addMonth(activeMonth, -1);
    const daysInMonth = NbDateTimeUtil.getNumberOfDaysInMonth(month);
    return NbDateTimeUtil.createDateRangeForMonth(month)
      .slice(daysInMonth - requiredItems)
      .map(date => boundingMonth ? date : null);
  }

  private createNextBoundingDays(activeMonth: Date, boundingMonth: boolean, requiredItems: number): Date[] {
    const month = NbDateTimeUtil.addMonth(activeMonth, 1);
    return NbDateTimeUtil.createDateRangeForMonth(month)
      .slice(0, requiredItems)
      .map(date => boundingMonth ? date : null);
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
