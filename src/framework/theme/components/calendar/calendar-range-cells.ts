import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { NbCalendarCell, NbDateTimeUtil } from '../calendar-kit';
import { NbCalendarRange } from './calendar-range.component';


@Component({
  selector: 'nb-calendar-range-day-cell',
  template: `
    <div
      class="day-cell"
      [class.today]="today"
      [class.selected]="selected"
      [class.bounding-month]="boundingMonth"
      [class.start]="start"
      [class.end]="end"
      [class.in-range]="inRange"
      [class.disabled]="disabled">
      {{ day }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'onClick()', 'class': 'range-cell' },
})
export class NbCalendarRangeDayCellComponent implements NbCalendarCell<NbCalendarRange> {
  @Input() date: Date;

  @Input() selectedValue: NbCalendarRange;

  @Input() visibleDate: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.in-range') get inRange(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.compareDates(this.date, this.selectedValue.start) >= 0)
      && (this.selectedValue.end && NbDateTimeUtil.compareDates(this.date, this.selectedValue.end) <= 0);
  }

  @HostBinding('class.start') get start(): boolean {
    return this.date && this.selectedValue && this.selectedValue.end
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start));
  }

  @HostBinding('class.end') get end(): boolean {
    return this.date && this.selectedValue &&
      (this.selectedValue.end && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.end));
  }

  get today(): boolean {
    return this.date && NbDateTimeUtil.isSameDay(this.date, new Date());
  }

  get boundingMonth(): boolean {
    return this.date && this.visibleDate && !NbDateTimeUtil.isSameMonth(this.date, this.visibleDate);
  }

  get selected(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start)) || this.end;
  }

  get empty(): boolean {
    return !this.date;
  }

  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
  }

  get day(): number {
    return this.date && this.date.getDate();
  }

  onClick() {
    if (this.disabled || this.empty) {
      return;
    }

    this.select.emit(this.date);
  }

  private smallerThanMin(): boolean {
    return this.date && this.min && NbDateTimeUtil.compareDates(this.date, this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && NbDateTimeUtil.compareDates(this.date, this.max) > 0;
  }

  private dontFitFilter(): boolean {
    return this.date && this.filter && !this.filter(this.date);
  }
}

@Component({
  selector: 'nb-calendar-range-year-cell',
  template: `{{ year }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'year-cell' },
})
export class NbCalendarRangeYearCellComponent implements NbCalendarCell<NbCalendarRange> {
  @Input() date: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() selectedValue: NbCalendarRange;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.selected') get selected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameYear(this.date, this.selectedValue.start);
  }

  @HostBinding('class.today') get today(): boolean {
    return this.date && NbDateTimeUtil.isSameYear(this.date, new Date());
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  get year(): number {
    return this.date.getFullYear();
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.date);
  }

  private smallerThanMin(): boolean {
    return this.date && this.min && NbDateTimeUtil.compareDates(this.yearEnd(), this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && NbDateTimeUtil.compareDates(this.yearStart(), this.max) > 0;
  }

  private yearStart(): Date {
    return NbDateTimeUtil.getYearStart(this.date);
  }

  private yearEnd(): Date {
    return NbDateTimeUtil.getYearEnd(this.date);
  }
}
