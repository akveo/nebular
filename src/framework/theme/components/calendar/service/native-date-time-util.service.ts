import { NbDateTimeUtil } from './date-time-util.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class NbNativeDateTimeUtilService extends NbDateTimeUtil<Date> {

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

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  add(date: Date, num: number = 0, type: string = 'd'): Date {
    switch (type.toLowerCase()) {
      case 'd': return this.createDateSafe(this.getYear(date), this.getMonth(date), this.getDate(date) + num);
      case 'm': return this.createDateSafe(this.getYear(date), this.getMonth(date) + num, this.getDate(date));
      case 'y': return this.createDateSafe(this.getYear(date) + num, this.getMonth(date), this.getDate(date));
      default: throw new Error('Unsupported operation: not implemented');
    }
  }

  createDate(year: number, month: number, date: number) {
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

}
