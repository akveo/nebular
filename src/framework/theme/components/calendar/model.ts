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
  states: NbCalendarCellState[] = [];
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

// TODO normalize naming
export enum NbCalendarCellState {
  TODAY = 'cell-today',
  BOUNDING_MONTH = 'cell-bounding-month',
  SELECTED = 'cell-selected',
  IN_RANGE = 'cell-range-inbetween',
}

export enum NbCalendarNameStyle {
  LONG = 'long',
  SHORT = 'short',
  NARROW = 'narrow',
}
