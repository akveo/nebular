/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { range } from '../helpers';

export namespace NbDateTimeUtil {
  export const DAYS_IN_WEEK: number = 7;

  export const markIfHoliday = (name, i) => ({ name, isHoliday: i % 6 === 0 });

  export const createDate = (year: number, month: number, date: number) => {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(result.getFullYear() - 1900);
    }
    return result;
  };

  export const isSameYear = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear();
  };

  export const isSameYearSafe = (date1: Date, date2: Date): boolean => {
    return date1 && date2 && isSameYear(date1, date2);
  };

  export const isSameMonth = (date1: Date, date2: Date): boolean => {
    return isSameYear(date1, date2) &&
      date1.getMonth() === date2.getMonth();
  };

  export const isSameMonthSafe = (date1: Date, date2: Date): boolean => {
    return date1 && date2 && isSameMonth(date1, date2);
  };

  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return isSameMonth(date1, date2) &&
      date1.getDate() === date2.getDate();
  };

  export const isSameDaySafe = (date1: Date, date2: Date): boolean => {
    return date1 && date2 && isSameDay(date1, date2);
  };

  export const compareDates = (date1: Date, date2: Date): number => {
    return date1.getTime() - date2.getTime();
  };

  export const isBetween = (date: Date, start: Date, end: Date): boolean => {
    return compareDates(date, start) > 0 && compareDates(date, end) < 0;
  };

  export const clone = (date: Date): Date => {
    return new Date(date.getTime());
  };

  export const getMonthStart = (date: Date): Date => {
    return createDate(date.getFullYear(), date.getMonth(), 1);
  };

  export const getMonthEnd = (date: Date): Date => {
    return createDate(date.getFullYear(), date.getMonth() + 1, 0);
  };

  export const getYearStart = (date: Date): Date => {
    return createDate(date.getFullYear(), 0, 1);
  };

  export const getYearEnd = (date: Date): Date => {
    return createDate(date.getFullYear(), 11, 31);
  };

  export const getNumberOfDaysInMonth = (date: Date): number => {
    return getMonthEnd(date).getDate();
  };

  export const addDay = (date: Date, num: number) => {
    return createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
  };

  export const addMonth = (date: Date, num: number) => {
    return createDate(date.getFullYear(), date.getMonth() + num, date.getDate());
  };

  export const addYear = (date: Date, num: number) => {
    return createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
  };

  export const createDateRangeForMonth = (date: Date): Date[] => {
    const daysInMonth: number = getNumberOfDaysInMonth(date);
    return range(daysInMonth, i => {
      const year = date.getFullYear();
      const month = date.getMonth();
      return NbDateTimeUtil.createDate(year, month, i + 1)
    });
  }
}
