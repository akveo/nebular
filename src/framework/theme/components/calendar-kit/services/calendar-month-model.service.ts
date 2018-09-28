/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { NbDateService } from './date.service';
import { batch, range } from '../helpers';


@Injectable()
export class NbCalendarMonthModelService<D> {

  constructor(protected dateService: NbDateService<D>) {
  }

  createDaysGrid(activeMonth: D, boundingMonth: boolean = true): D[][] {
    const weeks = this.createDates(activeMonth);
    return this.withBoundingMonths(weeks, activeMonth, boundingMonth);
  }

  private createDates(activeMonth: D): D[][] {
    const days = this.createDateRangeForMonth(activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(activeMonth);
    return batch(days, this.dateService.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private withBoundingMonths(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    let withBoundingMonths = weeks;

    if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    return withBoundingMonths;
  }

  private addPrevBoundingMonth(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    const firstWeek = weeks.shift();
    const requiredItems: number = this.dateService.DAYS_IN_WEEK - firstWeek.length;
    firstWeek.unshift(...this.createPrevBoundingDays(activeMonth, boundingMonth, requiredItems));
    return [firstWeek, ...weeks];
  }

  private addNextBoundingMonth(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    const lastWeek = weeks.pop();
    const requiredItems: number = this.dateService.DAYS_IN_WEEK - lastWeek.length;
    lastWeek.push(...this.createNextBoundingDays(activeMonth, boundingMonth, requiredItems));
    return [...weeks, lastWeek];
  }

  private createPrevBoundingDays(activeMonth: D, boundingMonth: boolean, requiredItems: number): D[] {
    const month = this.dateService.addMonth(activeMonth, -1);
    const daysInMonth = this.dateService.getNumberOfDaysInMonth(month);
    return this.createDateRangeForMonth(month)
      .slice(daysInMonth - requiredItems)
      .map(date => boundingMonth ? date : null);
  }

  private createNextBoundingDays(activeMonth: D, boundingMonth: boolean, requiredItems: number): D[] {
    const month = this.dateService.addMonth(activeMonth, 1);
    return this.createDateRangeForMonth(month)
      .slice(0, requiredItems)
      .map(date => boundingMonth ? date : null);
  }

  private getStartOfWeekDayDiff(date: D): number {
    const startOfMonth = this.dateService.getMonthStart(date);
    return this.getWeekStartDiff(startOfMonth);
  }

  private getWeekStartDiff(date: D): number {
    return (7 - this.dateService.getFirstDayOfWeek() + this.dateService.getDayOfWeek(date)) % 7;
  }

  private isShouldAddPrevBoundingMonth(weeks: D[][]): boolean {
    return weeks[0].length < this.dateService.DAYS_IN_WEEK;
  }

  private isShouldAddNextBoundingMonth(weeks: D[][]): boolean {
    return weeks[weeks.length - 1].length < this.dateService.DAYS_IN_WEEK;
  }

  private createDateRangeForMonth(date: D): D[] {
    const daysInMonth: number = this.dateService.getNumberOfDaysInMonth(date);
    return range(daysInMonth, i => {
      const year = this.dateService.getYear(date);
      const month = this.dateService.getMonth(date);
      return this.dateService.createDate(year, month, i + 1)
    });
  }
}
