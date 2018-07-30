/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NbDateTimeUtil } from '../../services';


@Component({
  selector: 'nb-calendar-year-cell',
  template: `{{ year }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearCellComponent {
  @Input() date: Date;
  @Input() selectedValue: Date;

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameYear(this.date, this.selectedValue);
  }

  get year(): number {
    return this.date.getFullYear();
  }
}
