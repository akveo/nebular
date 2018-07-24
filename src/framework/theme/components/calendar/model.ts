export interface NbCalendarMonth {
  weeks: Array<NbCalendarWeek>;
  monthStates: Array<string>;
}

export class NbCalendarWeek {
  cells: Array<NbCalendarCell<Date>>;
}

export interface NbCalendarDay {
  name: string;
  isHoliday: boolean;
}

export class NbCalendarCell<D> {
  date: D;
  state: NbCalendarCellState[] = [];
}

export class NbCalendarMonthBuilderContext<D> {
  activeMonth: D;
  selectedValue: any;
  today: D;
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
  SELECTED_RANGE = 'cell-selected-range',
  SELECTED_RANGE_START = 'cell-selected-range-start',
  SELECTED_RANGE_END = 'cell-selected-range-end',
}

export enum NbCalendarNameStyle {
  LONG = 'long',
  SHORT = 'short',
  NARROW = 'narrow',
}
