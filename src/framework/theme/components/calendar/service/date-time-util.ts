import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { NbCalendarNameStyle } from '../model';

/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
  'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

/** The default month names to use if Intl API is not available. */
const DEFAULT_MONTH_NAMES = {
  'long': [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ],
  'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
};

const SUPPORTS_INTL = typeof Intl !== 'undefined';

@Injectable()
export class NbDateTimeUtil {

  locale: string;

  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(@Inject(LOCALE_ID) matDateLocale: string) {
    this.locale = matDateLocale;
  }

  getNumberOfDaysInMonth(date: Date): number {
    return this.getDate(
      this.createDateSafe(this.getYear(date), this.getMonth(date) + 1, 0),
    );
  }

  getStartOfWeekDay() {
    return 1;
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getMonthName(date: Date): string {
    const index: number = this.getMonth(date);
    return this.getMonthNameByIndex(index);
  }

  getMonthNameByIndex(index: number): string {
    return this.months[index];
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  add(date: Date, num: number = 0, type: string = 'd'): Date {
    switch (type.toLowerCase()) {
      case 'd':
        return this.createDateSafe(this.getYear(date), this.getMonth(date), this.getDate(date) + num);
      case 'm':
        return this.createDateSafe(this.getYear(date), this.getMonth(date) + num, this.getDate(date));
      case 'y':
        return this.createDateSafe(this.getYear(date) + num, this.getMonth(date), this.getDate(date));
      default:
        throw new Error('Unsupported operation: not implemented');
    }
  }

  createDate(year: number, month: number, date: number): Date {
    return this.createDateSafe(year, month, date);
  }

  createNowDate(): Date {
    return new Date();
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  getMonthStart(date: Date): Date {
    return this.createDateSafe(this.getYear(date), this.getMonth(date), 1);
  }

  getWeekStart(date: Date): Date {
    const sowDiff = this.getWeekStartDiff(date);
    return this.createDateSafe(this.getYear(date), this.getMonth(date), this.getDate(date) - sowDiff);
  }

  getWeekStartDiff(date: Date): number {
    return (7 - this.getStartOfWeekDay() + this.getDayOfWeek(date)) % 7;
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return this.getYear(date1) === this.getYear(date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return this.isSameYear(date1, date2) &&
      this.getMonth(date1) === this.getMonth(date2);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return this.isSameMonth(date1, date2) &&
      this.getDate(date1) === this.getDate(date2);
  }

  compareDates(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  getMonthNames(type: 'long' | 'short' | 'narrow' = 'short'): string[] {
    if (SUPPORTS_INTL) {
      const formatter = new Intl.DateTimeFormat(this.locale, { month: type, timeZone: 'utc' });

      const res = [];
      for (let i = 0; i < 12; i++) {
        res.push(
          this.stripDirectionalityCharacters(this.format(formatter, new Date(2017, i, 1))),
        );
      }

      return res;
    }
    return DEFAULT_MONTH_NAMES[type];
  }

  getDayOfWeekNames(style: NbCalendarNameStyle): string[] {
    if (SUPPORTS_INTL) {
      const formatter = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });

      const res = [];
      for (let i = 1; i <= 7; i++) {
        res.push(
          this.stripDirectionalityCharacters(this.format(formatter, new Date(2017, 0, i))),
        );
      }

      return res;
    } else {
      return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
  }

  // Rewrite
  private createDateSafe(year: number, month: number, date: number) {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  /**
   * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
   * other browsers do not. We remove them to make output consistent and because they interfere with
   * date parsing.
   * @param str The string to strip direction characters from.
   * @returns The stripped string.
   */
  private stripDirectionalityCharacters(str: string) {
    return str.replace(/[\u200e\u200f]/g, '');
  }

  /**
   * When converting Date object to string, javascript built-in functions may return wrong
   * results because it applies its internal DST rules. The DST rules around the world change
   * very frequently, and the current valid rule is not always valid in previous years though.
   * We work around this problem building a new Date object which has its internal UTC
   * representation with the local date and time.
   * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
   *    timeZone set to 'utc' to work fine.
   * @param date Date from which we want to get the string representation according to dtf
   * @returns A Date object with its UTC representation based on the passed in date info
   */
  private format(dtf: Intl.DateTimeFormat, date: Date) {
    const d = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    return dtf.format(d);
  }

}
