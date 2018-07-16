/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarConfig } from '@nebular/theme/components/calendar/calendar-config';

const ViewModes = {
  year: 'year',
  month: 'month',
  date: 'date',
};

export abstract class NbBaseCalendarComponent<D, V> implements OnInit {

  @Input()
  selectedValue: V;

  @Input()
  activeMonth: D;

  @Input()
  calendarConfig: NbCalendarConfig = new NbCalendarConfig();

  @Output()
  change = new EventEmitter<V>();

  @Output()
  activeMonthChange = new EventEmitter<D>();

  // ----------------- Calendar state starts here -------------------------

  visibleMonths: Array<D> = [];

  dateToday: D;

  activeViewMode: string = ViewModes.date;

  ViewModes = ViewModes;

  yearViewActiveYear: number;

  // ----------------- Calendar state ends here -------------------------

  protected constructor(protected dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.dateToday = this.dateTimeUtil.createNowDate();
    this.activeMonth = this._getInitialActiveMonthFromValue() || this.dateToday;
    this._invalidateVisibleMonths();
    this.yearViewActiveYear =
      Math.ceil(this.dateTimeUtil.getYear(this.activeMonth) - this.calendarConfig.yearsToDisplayNumber / 2);
  }

  protected abstract _getInitialActiveMonthFromValue(): D;

  private _changeActiveMonth(direction) {
    this.activeMonth = this.dateTimeUtil.add(
      this.activeMonth,
      direction * this.calendarConfig.numberOfMonthsToIncrement,
      'm',
    );
    this._invalidateVisibleMonths();
    this.activeMonthChange.emit(this.activeMonth);
  }

  private _invalidateVisibleMonths() {
    this.visibleMonths = [this.activeMonth];
    for (let i = 1; i < this.calendarConfig.numberOfMonthsToDisplay; i++) {
      this.visibleMonths.push(
        this.dateTimeUtil.add(
          this.activeMonth,
          i,
          'm',
        ),
      );
    }
  }

  prevMonth() {
    this._changeActiveMonth(-1);
  }

  nextMonth() {
    this._changeActiveMonth(1);
  }

  prevYears() {
    this.yearViewActiveYear -= this.calendarConfig.yearsToDisplayNumber;
  }

  nextYears() {
    this.yearViewActiveYear += this.calendarConfig.yearsToDisplayNumber;
  }

}
