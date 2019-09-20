/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslationWidth } from '@angular/common';

import { NbDateService } from '@nebular/theme';

import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;


@Injectable()
export class NbMomentDateService extends NbDateService<Moment> {
  protected localeData: {
    firstDayOfWeek: number,
    defaultFormat: string,
    months: { [key: string]: string[] },
    days: { [key: string]: string[] },
  };

  constructor(@Inject(LOCALE_ID) locale: string) {
    super();
    this.setLocale(locale);
  }

  setLocale(locale: string) {
    super.setLocale(locale);
    this.setMomentLocaleData(locale);
  }

  addDay(date: Moment, days: number): Moment {
    return this.clone(date).add({ days });
  }

  addMonth(date: Moment, months: number): Moment {
    return this.clone(date).add({ months });
  }

  addYear(date: Moment, years: number): Moment {
    return this.clone(date).add({ years });
  }

  clone(date: Moment): Moment {
    return date.clone().locale(this.locale);
  }

  compareDates(date1: Moment, date2: Moment): number {
    return this.getYear(date1) - this.getYear(date2) ||
      this.getMonth(date1) - this.getMonth(date2) ||
      this.getDate(date1) - this.getDate(date2);
  }

  createDate(year: number, month: number, date: number): Moment {
    return moment([year, month, date]);
  }

  format(date: Moment, format: string): string {
    if (date) {
      return date.format(format || this.localeData.defaultFormat);
    }

    return '';
  }

  getDate(date: Moment): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  getDayOfWeekNames(style: TranslationWidth = TranslationWidth.Narrow): string[] {
    return this.localeData.days[style];
  }

  getFirstDayOfWeek(): number {
    return this.localeData.firstDayOfWeek;
  }

  getMonth(date: Moment): number {
    return this.clone(date).month();
  }

  getMonthEnd(date: Moment): Moment {
    return this.clone(date).endOf('month');
  }

  getMonthName(date: Moment, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    const month = this.getMonth(date);
    return this.getMonthNameByIndex(month, style);
  }

  getMonthNameByIndex(month: number, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    return this.localeData.months[style][month];
  }

  getMonthStart(date: Moment): Moment {
    return this.clone(date).startOf('month');
  }

  getNumberOfDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  getYear(date: Moment): number {
    return this.clone(date).year();
  }

  getYearEnd(date: Moment): Moment {
    return this.clone(date).endOf('year');
  }

  getYearStart(date: Moment): Moment {
    return this.clone(date).startOf('year');
  }

  isSameDay(date1: Moment, date2: Moment): boolean {
    return this.isSameMonth(date1, date2) && this.getDate(date1) === this.getDate(date2);
  }

  isSameMonth(date1: Moment, date2: Moment): boolean {
    return this.isSameYear(date1, date2) && this.getMonth(date1) === this.getMonth(date2);
  }

  isSameYear(date1: Moment, date2: Moment): boolean {
    return this.getYear(date1) === this.getYear(date2);
  }

  isValidDateString(date: string, format: string): boolean {
    return moment(date, format).isValid();
  }

  parse(date: string, format: string): Moment {
    return moment(date, format);
  }

  today(): Moment {
    return moment();
  }

  getId(): string {
    return 'moment';
  }

  protected setMomentLocaleData(locale: string) {
    const momentLocaleData = moment.localeData(locale);

    this.localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      defaultFormat: momentLocaleData.longDateFormat('L'),
      months: {
        [TranslationWidth.Abbreviated]: momentLocaleData.monthsShort(),
        [TranslationWidth.Wide]: momentLocaleData.months(),
      },
      days: {
        [TranslationWidth.Wide]: momentLocaleData.weekdays(),
        [TranslationWidth.Short]: momentLocaleData.weekdaysShort(),
        [TranslationWidth.Narrow]: momentLocaleData.weekdaysMin(),
      },
    };
  }

  getWeekNumber(date: Moment): number {
    return date.week();
  }
}
