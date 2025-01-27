/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormatWidth, getLocaleTimeFormat } from '@angular/common';
import {
  DatePipe,
  FormStyle,
  getLocaleDayNames,
  getLocaleFirstDayOfWeek,
  getLocaleMonthNames,
  TranslationWidth,
} from '@angular/common';

import { NbDateService } from './date.service';

/**
 * The `NbNativeDateService` is basic implementation of `NbDateService` using
 * native js date objects and angular localization services.
 * */
@Injectable()
export class NbNativeDateService extends NbDateService<Date> {
  protected datePipe: DatePipe;

  constructor(@Inject(LOCALE_ID) locale: string) {
    super();
    this.setLocale(locale);
  }

  setLocale(locale: string) {
    super.setLocale(locale);
    this.datePipe = new DatePipe(locale);
  }

  setHours(date: Date, hour: number): Date {
    const result: Date = this.clone(date);
    result.setHours(hour);

    return result;
  }

  setMinutes(date: Date, minute: number): Date {
    const result: Date = this.clone(date);
    result.setMinutes(minute);

    return result;
  }

  setSeconds(date: Date, second: number): Date {
    const result: Date = this.clone(date);
    result.setSeconds(second);

    return result;
  }

  setMilliseconds(date: Date, second: number): Date {
    const result: Date = this.clone(date);
    result.setMilliseconds(second);

    return result;
  }

  isValidDateString(date: string, format: string): boolean {
    return !isNaN(this.parse(date, format).getTime());
  }

  isValidTimeString(date: string, format: string): boolean {
    return this.isValidDateString(date, format);
  }

  today(): Date {
    return new Date();
  }

  getLocaleTimeFormat(): string {
    return getLocaleTimeFormat(this.locale, FormatWidth.Short);
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  getFirstDayOfWeek(): number {
    return getLocaleFirstDayOfWeek(this.locale);
  }

  getMonthName(date: Date, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    const index: number = date.getMonth();
    return this.getMonthNameByIndex(index, style);
  }

  getMonthNameByIndex(index: number, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    return getLocaleMonthNames(this.locale, FormStyle.Format, style)[index];
  }

  getDayOfWeekNames(): string[] {
    return [...getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Short)];
  }

  format(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

  /**
   * We haven't got capability to parse date using formatting without third party libraries.
   * */
  parse(date: string, format: string): Date {
    return new Date(Date.parse(date));
  }

  addDay(date: Date, num: number): Date {
    return this.createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
  }

  addMonth(date: Date, num: number): Date {
    const month = this.createDate(date.getFullYear(), date.getMonth() + num, 1);
    // In case of date has more days than calculated month js Date will change that month to the next one
    // because of the date overflow.
    month.setDate(Math.min(date.getDate(), this.getMonthEnd(month).getDate()));
    return month;
  }

  addMinutes(date: Date, minute: number): Date {
    const result: Date = new Date(date);
    result.setMinutes(date.getMinutes() + minute);

    return result;
  }

  addHours(date: Date, hour: number): Date {
    const result: Date = new Date(date);
    result.setHours(date.getHours() + hour);

    return result;
  }

  getHours(date: Date): number {
    return date.getHours();
  }

  getMinutes(date: Date): number {
    return date.getMinutes();
  }

  getSeconds(date: Date): number {
    return date.getSeconds();
  }

  getMilliseconds(date: Date): number {
    return date.getMilliseconds();
  }

  addYear(date: Date, num: number): Date {
    return this.createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  compareDates(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  createDate(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(result.getFullYear() - 1900);
    }
    return result;
  }

  getMonthEnd(date: Date): Date {
    return this.createDate(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getMonthStart(date: Date): Date {
    return this.createDate(date.getFullYear(), date.getMonth(), 1);
  }

  getNumberOfDaysInMonth(date: Date): number {
    return this.getMonthEnd(date).getDate();
  }

  getYearEnd(date: Date): Date {
    return this.createDate(date.getFullYear(), 11, 31);
  }

  getYearStart(date: Date): Date {
    return this.createDate(date.getFullYear(), 0, 1);
  }

  valueOf(date: Date): number {
    return date.valueOf();
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return this.isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return this.isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  getId(): string {
    return 'native';
  }

  getWeekNumber(date: Date): number {
    return parseInt(this.datePipe.transform(date, 'w'), 10);
  }

  getDateFormat(): string {
    return 'yyyy-MM-dd';
  }

  getTwelveHoursFormat(): string {
    return 'hh:mm a';
  }
}
