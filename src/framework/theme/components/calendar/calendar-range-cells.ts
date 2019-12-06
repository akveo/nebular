import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { NbCalendarCell } from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarRange } from './calendar-range.component';

abstract class NbBaseCalendarRangeCell<D> {
  abstract selectedValue: NbCalendarRange<D>;

  get hasRange(): boolean {
    return !!(this.selectedValue && this.selectedValue.start && this.selectedValue.end);
  }
}

@Component({
  selector: 'nb-calendar-range-day-cell',
  template: `
    <div class="cell-content">{{ day }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarRangeDayCellComponent<D> extends NbBaseCalendarRangeCell<D>
                                                implements NbCalendarCell<D, NbCalendarRange<D>> {
  @Input() date: D;

  @Input() selectedValue: NbCalendarRange<D>;

  @Input() visibleDate: D;

  @Input() min: D;

  @Input() max: D;

  @Input() filter: (D) => boolean;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  @HostBinding('class.in-range')
  get inRange(): boolean {
    if (this.date && this.hasRange) {
      return this.isInRange(this.date, this.selectedValue);
    }

    return false;
  }

  @HostBinding('class.start')
  get start(): boolean {
    return this.date && this.hasRange && this.dateService.isSameDay(this.date, this.selectedValue.start);
  }

  @HostBinding('class.end')
  get end(): boolean {
    return this.date && this.hasRange && this.dateService.isSameDay(this.date, this.selectedValue.end);
  }

  @HostBinding('class.range-cell')
  rangeCellClass = true;

  @HostBinding('class.day-cell')
  dayCellClass = true;

  @HostBinding('class.today')
  get today(): boolean {
    return this.date && this.dateService.isSameDay(this.date, this.dateService.today());
  }

  @HostBinding('class.bounding-month')
  get boundingMonth(): boolean {
    return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
  }

  @HostBinding('class.selected')
  get selected(): boolean {
    if (this.inRange) {
      return true;
    }

    if (this.selectedValue) {
      return this.dateService.isSameDay(this.date, this.selectedValue.start);
    }
  }

  @HostBinding('class.empty')
  get empty(): boolean {
    return !this.date;
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
  }

  get day(): number {
    return this.date && this.dateService.getDate(this.date);
  }

  @HostListener('click')
  onClick() {
    if (this.disabled || this.empty) {
      return;
    }

    this.select.emit(this.date);
  }

  protected smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
  }

  protected greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
  }

  protected dontFitFilter(): boolean {
    return this.date && this.filter && !this.filter(this.date);
  }

  protected isInRange(date: D, { start, end }: NbCalendarRange<D>): boolean {
    const isGreaterThanStart = this.dateService.compareDates(this.date, start) >= 0;
    const isLessThanEnd = this.dateService.compareDates(this.date, end) <= 0;

    return isGreaterThanStart && isLessThanEnd;
  }
}

@Component({
  selector: 'nb-calendar-range-year-cell',
  template: `
    <div class="cell-content">
      {{ year }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarRangeYearCellComponent<D> extends NbBaseCalendarRangeCell<D>
                                                 implements NbCalendarCell<D, NbCalendarRange<D>> {
  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() selectedValue: NbCalendarRange<D>;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  @HostBinding('class.in-range')
  get inRange(): boolean {
    return this.hasRange && this.isInRange(this.date, this.selectedValue);
  }

  @HostBinding('class.start')
  get rangeStart(): boolean {
    return this.hasRange && this.dateService.isSameYear(this.date, this.selectedValue.start);
  }

  @HostBinding('class.end')
  get rangeEnd(): boolean {
    return this.hasRange && this.dateService.isSameYear(this.date, this.selectedValue.end);
  }

  @HostBinding('class.selected')
  get selected(): boolean {
    if (this.inRange) {
      return true;
    }

    if (this.selectedValue) {
      return this.dateService.isSameYear(this.date, this.selectedValue.start);
    }
  }

  @HostBinding('class.today')
  get today(): boolean {
    return this.dateService.isSameYear(this.date, this.dateService.today());
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  @HostBinding('class.year-cell')
  yearCellClass = true;

  @HostBinding('class.range-cell')
  rangeCellClass = true;

  get year(): number {
    return this.dateService.getYear(this.date);
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.date);
  }

  protected smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
  }

  protected greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
  }

  protected yearStart(): D {
    return this.dateService.getYearStart(this.date);
  }

  protected yearEnd(): D {
    return this.dateService.getYearEnd(this.date);
  }

  protected isInRange(date: D, { start, end }: NbCalendarRange<D>): boolean {
    if (start && end) {
      const cellYear = this.dateService.getYear(date);
      const startYear = this.dateService.getYear(start);
      const endYear = this.dateService.getYear(end);

      return cellYear >= startYear && cellYear <= endYear;
    }

    return this.dateService.isSameYear(date, start);
  }
}

@Component({
  selector: 'nb-calendar-range-month-cell',
  template: `
    <div class="cell-content">
      {{ month }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarRangeMonthCellComponent<D> extends NbBaseCalendarRangeCell<D>
                                                  implements NbCalendarCell<D, NbCalendarRange<D>> {

  get month(): string {
    return this.dateService.getMonthName(this.date);
  }

  @Input() date: D;
  @Input() visibleDate: D;

  @Input() selectedValue: NbCalendarRange<D>;
  @Input() min: D;
  @Input() max: D;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  @HostBinding('class.month-cell')
  monthCellClass = true;

  @HostBinding('class.range-cell')
  rangeCellClass = true;

  @HostBinding('class.selected')
  get selected(): boolean {
    if (this.inRange) {
      return true;
    }

    if (this.selectedValue) {
      return this.dateService.isSameMonth(this.date, this.selectedValue.start);
    }
  }

  @HostBinding('class.in-range')
  get inRange(): boolean {
    if (this.hasRange) {
      return this.isInRage(this.date, this.selectedValue);
    }
  }

  @HostBinding('class.start')
  get rangeStart(): boolean {
    if (this.hasRange) {
      return this.dateService.isSameMonth(this.date, this.selectedValue.start);
    }
  }

  @HostBinding('class.end')
  get rangeEnd(): boolean {
    if (this.hasRange) {
      return this.dateService.isSameMonth(this.date, this.selectedValue.end);
    }
  }

  @HostBinding('class.today')
  get today(): boolean {
    return this.dateService.isSameMonthSafe(this.date, this.dateService.today());
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.date);
  }

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  protected smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.monthEnd(), this.min) < 0;
  }

  protected greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.monthStart(), this.max) > 0;
  }

  protected monthStart(): D {
    return this.dateService.getMonthStart(this.date);
  }

  protected monthEnd(): D {
    return this.dateService.getMonthEnd(this.date);
  }

  protected isInRage(date: D, range: NbCalendarRange<D>): boolean {
    if (range.start && range.end) {
      const cellDate = this.dateService.getMonthStart(date);
      const start = this.dateService.getMonthStart(range.start);
      const end = this.dateService.getMonthStart(range.end);

      const isGreaterThanStart = this.dateService.compareDates(cellDate, start) >= 0;
      const isLessThanEnd = this.dateService.compareDates(cellDate, end) <= 0;

      return isGreaterThanStart && isLessThanEnd;
    }

    return this.dateService.isSameMonth(date, range.start);
  }
}
