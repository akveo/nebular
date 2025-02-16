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
    selector: 'nb-calendar-range-year-cell',
    template: `
    <div class="cell-content">
      {{ year }}
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NbCalendarRangeYearCellComponent<D> extends NbBaseCalendarRangeCell<D>
  implements NbCalendarCell<D, NbCalendarRange<D>> {
  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() selectedValue: NbCalendarRange<D>;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;

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
      return this.dateService.isSameYearSafe(this.date, this.selectedValue.start);
    }

    return false;
  }

  @HostBinding('class.today')
  get today(): boolean {
    return this.dateService.isSameYear(this.date, this.dateService.today());
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  @HostBinding('class.size-large')
  get isLarge(): boolean {
    return this.size === NbCalendarSize.LARGE;
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
