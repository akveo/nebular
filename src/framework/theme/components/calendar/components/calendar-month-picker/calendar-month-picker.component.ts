/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { batch, range } from '../../helpers';
import { NbLocaleAdapter } from '@nebular/theme/components/calendar/service';

// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  template: `
    <nb-calendar-navigation [date]="activeMonth" (click)="changeMode.emit()"></nb-calendar-navigation>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of months">
        <div class="month"
             *ngFor="let month of chunk"
             [class.selected]="month.selected"
             (click)="onClick(month.value)">
          {{ month.label }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent implements OnInit {

  @Input() activeMonth: Date;

  @Input() today: Date;

  @Output() changeMode = new EventEmitter<void>();
  // TODO think about name, maybe it would be better to call this select or just click?
  @Output() change = new EventEmitter<Date>();

  // TODO define type for month
  months: any[];

  constructor(private localeAdapter: NbLocaleAdapter) {
  }

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const selectedMonth = this.activeMonth.getMonth();

    // TODO maybe we need one more util for cases like that?
    const months = range(12)
      .map(index => ({
        value: index,
        label: this.localeAdapter.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));

    this.months = batch(months, 4);
  }

  onClick(month) {
    const year = this.activeMonth.getFullYear();
    const day = this.activeMonth.getDate();
    const event = NbDateTimeUtil.createDate(year, month, day);
    this.change.emit(event);
  }
}
