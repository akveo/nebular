/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarModelFactoryService } from './models/factory/calendar-model-factory.service';

const ViewMode = {
  year: 'year',
  month: 'month',
  date: 'date',
};

const defaultStartYear = 2016;
const defaultYearCount = 20;

/**
 * Basic example with including bounding dates
 * @stacked-example(Calendar Date Picker, calendar/calendar-test.component)
 *
 * Example with range selection
 * @stacked-example(Calendar Date Range Picker, calendar/calendar-range-test.component)
 *
 * @styles
 *
 * calendar-width:
 * calendar-height:
 * calendar-padding:
 * calendar-fg:
 * calendar-bg:
 * calendar-selected-item:
 * calendar-active-item:
 * calendar-between-item:
 * calendar-hovered-item:
 * calendar-inactive-opacity:
 * calendar-cell-width:
 * calendar-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-border-radius:
 * calendar-row-padding:
 * calendar-weekday-width:
 * calendar-weekday-height:
 * calendar-weekday-font-size:
 * calendar-weekday-font-weight:
 * calendar-weekday-fg:
 * calendar-holiday-fg:
 *
 */
@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [ NbCalendarModelFactoryService ],
})
export class NbCalendarComponent<D> implements OnInit {

  @Input()
  value: D;

  @Input()
  boundingMonths: boolean = true;

  @Output()
  change = new EventEmitter();

  newValue: D;

  currentDate: D;

  ViewMode = ViewMode;
  viewMode = ViewMode.date;

  startYear = defaultStartYear;
  yearCount = defaultYearCount;

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.currentDate = this.dateTimeUtil.createNowDate();
    this.newValue = this.value || this.currentDate;
  }

  prevMonth() {
    this.newValue = this.dateTimeUtil.add(this.newValue, -1, 'm');
  }

  nextMonth() {
    this.newValue = this.dateTimeUtil.add(this.newValue, 1, 'm');
  }

  prevYears() {
    this.startYear -= defaultYearCount;
  }

  nextYears() {
    this.startYear += defaultYearCount;
  }

  onChange(value) {
    this.change.emit(value);
  }
}
