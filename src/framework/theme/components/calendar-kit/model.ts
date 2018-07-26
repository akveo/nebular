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
  status: NbCalendarCellStatus[] = [];
}

export class NbCalendarMonthBuilderContext<T> {
  activeMonth: Date;
  selectedValue: T;
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

export enum NbCalendarCellStatus {
  TODAY = 'cell-today',
  BOUNDING_MONTH = 'cell-bounding-month',
  SELECTED = 'cell-selected',

  IN_RANGE = 'cell-range-inbetween',
}
