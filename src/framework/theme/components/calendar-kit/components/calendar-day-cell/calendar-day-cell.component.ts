/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NbDateTimeUtil } from '../../services/date-time-util';


@Component({
  selector: 'nb-calendar-day-cell',
  styleUrls: ['./calendar-day-cell.component.scss'],
  template: `{{ day }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayCellComponent {
  @Input() date: Date;
  @Input() selectedValue: Date;
  @Input() activeMonth: Date;

  @HostBinding('class.today') get isToday(): boolean {
    return NbDateTimeUtil.isSameDay(this.date, new Date());
  }

  @HostBinding('class.bounding-month') get isBoundingMonth(): boolean {
    return !NbDateTimeUtil.isSameMonth(this.date, this.activeMonth);
  }

  @HostBinding('class.selected') get isSelected(): boolean {
    return this.selectedValue && NbDateTimeUtil.isSameDay(this.date, this.selectedValue);
  }

  get day(): number {
    return this.date.getDate();
  }
}
