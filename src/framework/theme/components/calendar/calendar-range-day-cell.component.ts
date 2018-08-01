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
  host: { '(click)': 'select.emit(date)' },
})
export class NbCalendarRangeDayCellComponent implements NbCalendarCell<NbCalendarRange> {
  @Input() date: Date;
  @Input() selectedValue: NbCalendarRange;
  @Input() activeMonth: Date;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.today') get isToday(): boolean {
    return this.date && NbDateTimeUtil.isSameDay(this.date, new Date());
  }

  @HostBinding('class.bounding-month') get isBoundingMonth(): boolean {
    return this.date && this.activeMonth && !NbDateTimeUtil.isSameMonth(this.date, this.activeMonth);
  }

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start)) || this.isEnd;
  }

  @HostBinding('class.start') get isStart(): boolean {
    return this.date && this.selectedValue && this.selectedValue.end
      && (this.selectedValue.start && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.start));
  }

  @HostBinding('class.end') get isEnd(): boolean {
    return this.date && this.selectedValue &&
      (this.selectedValue.end && NbDateTimeUtil.isSameDay(this.date, this.selectedValue.end));
  }

  @HostBinding('class.empty') get isEmpty(): boolean {
    return !this.date;
  }

  @HostBinding('class.in-range') get isInRange(): boolean {
    return this.date && this.selectedValue
      && (this.selectedValue.start && NbDateTimeUtil.compareDates(this.date, this.selectedValue.start) > 0)
      && (this.selectedValue.end && NbDateTimeUtil.compareDates(this.date, this.selectedValue.end) < 0);
  }

  get day(): number {
    return this.date && this.date.getDate();
  }
}
