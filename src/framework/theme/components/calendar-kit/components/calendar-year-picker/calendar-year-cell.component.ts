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
  host: { '(click)': 'select.emit(date)' },
})
export class NbCalendarYearCellComponent implements NbCalendarCell<Date> {
  @Input() date: Date;
  @Input() selectedValue: Date;
  @Output() select: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameYear(this.date, this.selectedValue);
  }

  get year(): number {
    return this.date.getFullYear();
  }
}
