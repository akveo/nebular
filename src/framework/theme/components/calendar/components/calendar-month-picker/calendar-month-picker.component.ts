/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { batch, range } from '../../helpers';

// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  template: `
    <nb-calendar-header [activeMonth]="activeMonth" (select)="changeMode.emit()"></nb-calendar-header>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of months">
        <div class="month"
             *ngFor="let month of chunk"
             [class.selected]="month.selected"
             (click)="onSelect(month.value)">
          {{ month.label }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent<D> implements OnInit {

  @Input() activeMonth: D;

  @Input() today: D;

  @Output() changeMode = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  months: any[];

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const selectedMonth = this.dateTimeUtil.getMonth(this.activeMonth);

    // TODO maybe we need one more util for cases like that?
    const months = range(12)
      .map(index => ({
        value: index,
        label: this.dateTimeUtil.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));

    this.months = batch(months, 4);
  }

  onSelect(month) {
    const year = this.dateTimeUtil.getYear(this.activeMonth);
    const day = this.dateTimeUtil.getDate(this.activeMonth);
    const event = this.dateTimeUtil.createDate(year, month, day);
    this.change.emit(event);
  }
}
