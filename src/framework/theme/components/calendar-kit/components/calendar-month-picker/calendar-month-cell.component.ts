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
import { NbDateTimeUtil, NbLocaleService } from '../../services';
import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-month-cell',
  template: `{{ month }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'month-cell' },
})
export class NbCalendarMonthCellComponent implements NbCalendarCell<Date> {
  @Input() date: Date;

  @Input() selectedValue: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  constructor(private localeService: NbLocaleService) {
  }

  @HostBinding('class.selected') get selected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameMonth(this.date, this.selectedValue);
  }

  @HostBinding('class.today') get today(): boolean {
    return this.date && NbDateTimeUtil.isSameMonth(this.date, new Date());
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  get month(): string {
    return this.localeService.getMonthNameByIndex(this.date.getMonth());
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.date);
  }

  private smallerThanMin(): boolean {
    return this.date && this.min && NbDateTimeUtil.compareDates(this.monthEnd(), this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && NbDateTimeUtil.compareDates(this.monthStart(), this.max) > 0;
  }

  private monthStart(): Date {
    return NbDateTimeUtil.getMonthStart(this.date);
  }

  private monthEnd(): Date {
    return NbDateTimeUtil.getMonthEnd(this.date);
  }
}
