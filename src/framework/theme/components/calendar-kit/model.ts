export interface NbCalendarMonth {
  weeks: Array<NbCalendarWeek>;
  monthStates: Array<string>;
}

export class NbCalendarWeek {
  cells: Array<NbCalendarCell>;
}

export interface NbCalendarDay {
  name: string;
  isHoliday: boolean;
}

export class NbCalendarCell {
  date: Date;
  state: NbCalendarCellState[] = [];
}

export class NbCalendarMonthBuilderContext<T> {
  activeMonth: Date;
  selectedValue: T;
  today: Date;
  includeBoundingMonths: boolean;
}

export class NbCalendarRange {
  start: Date;
  end?: Date;
}

export enum NbCalendarViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
}

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
