/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NbDateTimeUtil, NbLocaleService } from '../../services';
import { NbCalendarCell } from '../calendar-cell';


@Component({
  selector: 'nb-calendar-month-cell',
  template: `{{ month }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'select.emit(date)' },
})
export class NbCalendarMonthCellComponent implements NbCalendarCell<Date> {
  @Input() date: Date;
  @Input() selectedValue: Date;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  constructor(private localeService: NbLocaleService) {
  }

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameMonth(this.date, this.selectedValue);
  }

  get month(): string {
    return this.localeService.getMonthNameByIndex(this.date.getMonth());
  }
}
