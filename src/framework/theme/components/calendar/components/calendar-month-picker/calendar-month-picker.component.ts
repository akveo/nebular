/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output,
} from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbArrayHelper } from '../../helpers/array.helper';

/**
 */
@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  templateUrl: './calendar-month-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent<D> implements OnInit, OnChanges {

  @Input()
  value: D;

  @Input()
  public currentDate: D;

  months: any[];

  @Output()
  change = new EventEmitter<any>();

  constructor(private dateTimeUtil: NbDateTimeUtil<D>,
              private arrayHelper: NbArrayHelper) {}

  ngOnInit() {
    this.currentDate = this.currentDate || this.dateTimeUtil.createNowDate();
    this.value = this.value || this.dateTimeUtil.clone(this.currentDate);
  }

  ngOnChanges(): void {
    if (this.value) {
      this.initMonths();
    }
  }

  initMonths() {
    const selectedMonth = this.dateTimeUtil.getMonth(this.value);

    const months = Array.from(Array(12).keys())
      .map(index => ({
        value: index,
        label: this.dateTimeUtil.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));

    this.months = this.arrayHelper.splitToChunks(months, 4);
  }

  onMonthSelect(month) {
    this.value = this.dateTimeUtil.createDate(
      this.dateTimeUtil.getYear(this.value),
      month,
      this.dateTimeUtil.getDate(this.value),
    );
    this.change.emit(this.value);
  }
}
