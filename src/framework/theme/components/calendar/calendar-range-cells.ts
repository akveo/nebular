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
export class NbCalendarRangeDayCellComponent<D> implements NbCalendarCell<D, NbCalendarRange<D>> {
  @Input() date: D;

  @Input() selectedValue: NbCalendarRange<D>;

  @Input() visibleDate: D;

  @Input() min: D;

  @Input() max: D;

  @Input() filter: (D) => boolean;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  constructor(protected dateService: NbDateService<D>) {
  }

  @HostBinding('class.in-range') get inRange(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && this.dateService.compareDates(this.date, this.selectedValue.start) >= 0)
      && (this.selectedValue.end && this.dateService.compareDates(this.date, this.selectedValue.end) <= 0);
  }

  @HostBinding('class.start') get start(): boolean {
    return this.date && this.selectedValue && this.selectedValue.end
      && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start));
  }

  @HostBinding('class.end') get end(): boolean {
    return this.date && this.selectedValue &&
      (this.selectedValue.end && this.dateService.isSameDay(this.date, this.selectedValue.end));
  }

  get today(): boolean {
    return this.date && this.dateService.isSameDay(this.date, this.dateService.today());
  }

  get boundingMonth(): boolean {
    return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
  }

  get selected(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start)) || this.end;
  }

  get empty(): boolean {
    return !this.date;
  }

  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
  }

  get day(): number {
    return this.date && this.dateService.getDate(this.date);
  }

  onClick() {
    if (this.disabled || this.empty) {
      return;
    }

    this.select.emit(this.date);
  }

  private smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
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
export class NbCalendarRangeYearCellComponent<D> implements NbCalendarCell<D, NbCalendarRange<D>> {
  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() selectedValue: NbCalendarRange<D>;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  constructor(protected dateService: NbDateService<D>) {
  }

  @HostBinding('class.selected') get selected(): boolean {
    return this.selectedValue && this.dateService.isSameYear(this.date, this.selectedValue.start);
  }

  @HostBinding('class.today') get today(): boolean {
    return this.date && this.dateService.isSameYear(this.date, this.dateService.today());
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

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

  private smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
  }

  private yearStart(): D {
    return this.dateService.getYearStart(this.date);
  }

  private yearEnd(): D {
    return this.dateService.getYearEnd(this.date);
  }
}
