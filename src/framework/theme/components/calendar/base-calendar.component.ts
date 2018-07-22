/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarConfig } from './calendar-config';
import { NbCalendarViewMode } from './model';

export abstract class NbBaseCalendarComponent<D, V> implements OnInit {

  @Input() date: V;

  @Input() config: NbCalendarConfig = new NbCalendarConfig();

  @Output() dateChange = new EventEmitter<V>();

  @Output() activeMonthChange = new EventEmitter<D>();

  visibleMonths: Array<D> = [];

  today: D;

  ViewMode = NbCalendarViewMode;

  activeMonth: D;
  activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;
  activeYear: number;

  protected constructor(protected dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.today = this.dateTimeUtil.createNowDate();
    this.activeMonth = this.getInitialActiveMonthFromValue() || this.today;
    this.invalidateVisibleMonths();
    this.activeYear =
      Math.ceil(this.dateTimeUtil.getYear(this.activeMonth) - this.config.yearsToDisplayNumber / 2);
  }

  selectViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  prevMonth() {
    this.changeActiveMonth(-1);
  }

  nextMonth() {
    this.changeActiveMonth(1);
  }

  prevYears() {
    this.activeYear -= this.config.yearsToDisplayNumber;
  }

  nextYears() {
    this.activeYear += this.config.yearsToDisplayNumber;
  }

  protected abstract getInitialActiveMonthFromValue(): D;

  private changeActiveMonth(direction) {
    this.activeMonth = this.dateTimeUtil.add(
      this.activeMonth,
      direction * this.config.numberOfMonthsToIncrement,
      'm',
    );
    this.invalidateVisibleMonths();
    this.activeMonthChange.emit(this.activeMonth);
  }

  private invalidateVisibleMonths() {
    this.visibleMonths = [this.activeMonth];
    for (let i = 1; i < this.config.numberOfMonthsToDisplay; i++) {
      this.visibleMonths.push(
        this.dateTimeUtil.add(
          this.activeMonth,
          i,
          'm',
        ),
      );
    }
  }
}
