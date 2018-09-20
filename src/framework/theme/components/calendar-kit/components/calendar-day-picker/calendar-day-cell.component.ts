/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { NbDateTimeUtil, NbLocaleService } from '../../services/';
import { NbCalendarCell } from '../../model';

@Component({
  selector: 'nb-calendar-day-cell',
  template: '{{ day }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'day-cell' },
})
export class NbCalendarDayCellComponent implements NbCalendarCell<Date> {

  constructor(private locale: NbLocaleService) { }

  @Input() date: Date;

  @Input() selectedValue: Date;

  @Input() visibleDate: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.today') get today(): boolean {
    return NbDateTimeUtil.isSameDaySafe(this.date, new Date());
  }

  @HostBinding('class.bounding-month') get boundingMonth(): boolean {
    return !NbDateTimeUtil.isSameMonthSafe(this.date, this.visibleDate);
  }

  @HostBinding('class.selected') get selected(): boolean {
    return NbDateTimeUtil.isSameDaySafe(this.date, this.selectedValue);
  }

  @HostBinding('class.empty') get empty(): boolean {
    return !this.date;
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
  }

  get day(): string | number {
    return this.date && this.locale.getNumeric(this.date.getDate());
  }

  @HostListener('click')
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
