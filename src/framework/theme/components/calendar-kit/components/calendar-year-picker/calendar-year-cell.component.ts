/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NbDateTimeUtil } from '../../services';
import { NbCalendarCell } from '../calendar-cell';


@Component({
  selector: 'nb-calendar-year-cell',
  template: `{{ year }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'onClick()', 'class': 'cell' },
})
export class NbCalendarYearCellComponent implements NbCalendarCell<Date> {
  @Input() date: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() selectedValue: Date;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.selected') get selected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameYear(this.date, this.selectedValue);
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  get year(): number {
    return this.date.getFullYear();
  }

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
