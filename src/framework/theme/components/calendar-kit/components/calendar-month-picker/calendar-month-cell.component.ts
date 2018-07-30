/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NbDateTimeUtil, NbLocaleService } from '../../services';


@Component({
  selector: 'nb-calendar-month-cell',
  template: `{{ month }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthCellComponent {
  @Input() date: Date;
  @Input() selectedValue: Date;

  constructor(private localeService: NbLocaleService) {
  }

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameDay(this.date, this.selectedValue);
  }

  get month(): string {
    return this.localeService.getMonthNameByIndex(this.date.getMonth());
  }
}
