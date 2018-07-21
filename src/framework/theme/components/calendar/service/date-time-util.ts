import { NbCalendarNameStyle } from '@nebular/theme/components/calendar/model';

export abstract class NbDateTimeUtil<D> {
  abstract getNumberOfDaysInMonth(date: D): number;
  abstract getStartOfWeekDay(): number;

  abstract getDate(date: D): number;
  abstract getMonth(date: D): number;
  abstract getMonthName(date: Date): string;
  abstract getMonthNameByIndex(index: number): string;
  abstract getYear(date: D): number;
  abstract getDayOfWeek(date: D): number;

  abstract createDate(year: number, month: number, date: number);
  abstract createNowDate(): D;
  abstract add(date: D, num: number, type: string): D;
  abstract clone(date: D): D;

  abstract getWeekStart(date: D): D;
  abstract getWeekStartDiff(date: D): number;
  abstract getMonthStart(date: D): D;

  abstract isSameYear(date1: D, date2: D): boolean;
  abstract isSameMonth(date1: D, date2: D): boolean;
  abstract isSameDay(date1: D, date2: D): boolean;
  abstract compareDates(date1: D, date2: D): number;

  // Formatting methods
  abstract getMonthNames(type: 'long' | 'short' | 'narrow'): string[];
  abstract getDayOfWeekNames(style: NbCalendarNameStyle): string[];

}
