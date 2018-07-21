export interface NbCalendarMonth {
  weeks: Array<NbCalendarWeek>;
  monthStates: Array<string>;
}

export class NbCalendarWeek {
  cells: Array<NbCalendarCell>;
  padLeft?: number = 0;
  padRight?: number = 0;
}

export interface NbCalendarDay {
  name: string;
  isHoliday: boolean;
}

export class NbCalendarCell {
  year: number;
  month: number;
  date: number;
  activeMonthDiff: number = 0;
  cellStates: Array<string> = [];
  extraData?: any = null;
}

export class NbCalendarMonthBuilderContext<D> {
  activeMonth: D;
  selectedValue: any;
  currentValue: D;
  includeBoundingMonths: boolean;
}

export class NbCalendarRange<D> {
  start: D;
  end?: D;
}

export enum NbCalendarViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
}
