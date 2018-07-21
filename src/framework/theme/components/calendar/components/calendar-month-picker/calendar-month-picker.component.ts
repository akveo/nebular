/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbArrayHelper } from '../../helpers/array.helper';

@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  template: `
    <nb-calendar-header
      [activeMonth]="activeMonth"
      (select)="changeMode.emit()">
    </nb-calendar-header>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of months">
        <div class="month"
             *ngFor="let month of chunk"
             [class.selected]="month.selected"
             (click)="onMonthSelect(month.value)">
          {{ month.label }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent<D> implements OnInit, OnChanges {

  @Input() activeMonth: D;

  @Input() today: D;

  @Output() changeMode = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  months: any[];

  constructor(private dateTimeUtil: NbDateTimeUtil<D>,
              private arrayHelper: NbArrayHelper) {
  }

  ngOnInit() {
    this.today = this.today || this.dateTimeUtil.createNowDate();
    this.activeMonth = this.activeMonth || this.dateTimeUtil.clone(this.today);
  }

  ngOnChanges(): void {
    if (this.activeMonth) {
      this.initMonths();
    }
  }

  initMonths() {
    const selectedMonth = this.dateTimeUtil.getMonth(this.activeMonth);

    const months = Array.from(Array(12).keys())
      .map(index => ({
        value: index,
        label: this.dateTimeUtil.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));

    this.months = this.arrayHelper.splitToChunks(months, 4);
  }

  onMonthSelect(month) {
    this.activeMonth = this.dateTimeUtil.createDate(
      this.dateTimeUtil.getYear(this.activeMonth),
      month,
      this.dateTimeUtil.getDate(this.activeMonth),
    );
    this.change.emit(this.activeMonth);
  }
}
