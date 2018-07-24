/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarViewMode } from './model';

export abstract class NbBaseCalendarComponent<D, V> implements OnInit {

  @Input() date: V;

  @Output() dateChange = new EventEmitter<V>();

  @Output() activeMonthChange = new EventEmitter<D>();

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
    this.activeYear = Math.ceil(this.dateTimeUtil.getYear(this.activeMonth) - 10);
  }

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setActiveMonth(activeMonth: D) {
    this.activeMonth = activeMonth;
  }

  prevMonth() {
    this.changeActiveMonth(-1);
  }

  nextMonth() {
    this.changeActiveMonth(1);
  }

  prevYears() {
    this.activeYear -= 1;
  }

  nextYears() {
    this.activeYear += 1;
  }

  abstract onDateChange(date: D);

  protected abstract getInitialActiveMonthFromValue(): D;

  private changeActiveMonth(direction) {
    this.activeMonth = this.dateTimeUtil.add(this.activeMonth, direction, 'm');
    this.activeMonthChange.emit(this.activeMonth);
  }
}
