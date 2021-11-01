/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../calendar-kit/model';
import { NbCalendarRange } from './calendar-range.component';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbBaseCalendarRangeCell } from './base-calendar-range-cell';

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

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;

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
      return this.dateService.isSameDaySafe(this.date, this.selectedValue.start);
    }

    return false;
  }

  @HostBinding('class.empty')
  get empty(): boolean {
    return !this.date;
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
  }

  @HostBinding('class.size-large')
  get isLarge(): boolean {
    return this.size === NbCalendarSize.LARGE;
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
