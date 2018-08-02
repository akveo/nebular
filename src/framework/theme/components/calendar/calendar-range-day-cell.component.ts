import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { NbCalendarCell, NbDateTimeUtil } from '../calendar-kit';
import { NbCalendarRange } from './calendar-range.component';


// TODO refactor bindings
// TODO refactor styles
@Component({
  selector: 'nb-calendar-range-day-cell',
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1px;
    }

    :host:not(.empty) {
      cursor: pointer;
    }
  `],
  template: '{{ day }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'onClick()', 'class': 'cell' },
})
export class NbCalendarRangeDayCellComponent implements NbCalendarCell<NbCalendarRange> {
  @Input() date: Date;

  @Input() selectedValue: NbCalendarRange;

  @Input() visibleDate: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.today') get today(): boolean {
    return this.date && NbDateTimeUtil.isSameDay(this.date, new Date());
  }

  @HostBinding('class.bounding-month') get boundingMonth(): boolean {
    return this.date && this.visibleDate && !NbDateTimeUtil.isSameMonth(this.date, this.visibleDate);
  }

  @HostBinding('class.selected') get selected(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start)) || this.end;
  }

  @HostBinding('class.start') get start(): boolean {
    return this.date && this.selectedValue && this.selectedValue.end
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start));
  }

  @HostBinding('class.end') get end(): boolean {
    return this.date && this.selectedValue &&
      (this.selectedValue.end && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.end));
  }

  @HostBinding('class.empty') get empty(): boolean {
    return !this.date;
  }

  @HostBinding('class.in-range') get inRange(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.compareDates(this.date, this.selectedValue.start) > 0)
      && (this.selectedValue.end && NbDateTimeUtil.compareDates(this.date, this.selectedValue.end) < 0);
  }

  @HostBinding('class.disabled') get disabled(): boolean {
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
