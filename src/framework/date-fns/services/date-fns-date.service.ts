/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import {
  FormStyle,
  getLocaleDayNames,
  getLocaleFirstDayOfWeek,
  getLocaleMonthNames,
  TranslationWidth,
} from '@angular/common';

import { NbDateService } from '@nebular/theme';

import * as DateFns from './date-fns';


@Injectable()
export class NbDateFnsDateService extends NbDateService<Date> {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super();
    this.setLocale(locale);
  }

  addDay(date: Date, days: number): Date {
    return DateFns.addDays(date, days);
  }

  addMonth(date: Date, months: number): Date {
    return DateFns.addMonths(date, months);
  }

  addYear(date: Date, years: number): Date {
    return DateFns.addYears(date, years);
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  compareDates(date1: Date, date2: Date): number {
    return DateFns.compareAsc(date1, date2);
  }

  createDate(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  format(date: Date, format: string): string {
    return DateFns.formatDate(date, format);
  }

  getDate(date: Date): number {
    return DateFns.getDate(date);
  }

  getDayOfWeek(date: Date): number {
    return DateFns.getDay(date);
  }

  getDayOfWeekNames(style: TranslationWidth = TranslationWidth.Narrow): string[] {
    return getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Short);
  }

  getFirstDayOfWeek(): number {
    return getLocaleFirstDayOfWeek(this.locale);
  }

  getMonth(date: Date): number {
    return DateFns.getMonth(date);
  }

  getMonthEnd(date: Date): Date {
    return DateFns.endOfMonth(date);
  }

  getMonthName(date: Date, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    const month = this.getMonth(date);
    return this.getMonthNameByIndex(month, style);
  }

  getMonthNameByIndex(month: number, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    return getLocaleMonthNames(this.locale, FormStyle.Format, style)[month];
  }

  getMonthStart(date: Date): Date {
    return DateFns.startOfMonth(date);
  }

  getNumberOfDaysInMonth(date: Date): number {
    return DateFns.getDaysInMonth(date);
  }

  getYear(date: Date): number {
    return DateFns.getYear(date);
  }

  getYearEnd(date: Date): Date {
    return DateFns.endOfYear(date);
  }

  getYearStart(date: Date): Date {
    return DateFns.startOfYear(date);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return DateFns.isSameDay(date1, date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return DateFns.isSameMonth(date1, date2);
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return DateFns.isSameYear(date1, date2);
  }

  isValidDateString(date: string, format: string): boolean {
    return !isNaN(this.parse(date, format).getTime());
  }

  parse(date: string, format: string): Date {
    return DateFns.parse(date, format, new Date());
  }

  today(): Date {
    return new Date();
  }
}
