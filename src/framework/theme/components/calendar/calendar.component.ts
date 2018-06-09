/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbDateTimeUtil } from './service/date-time-util.interface';

const ViewMode = {
  year: 'year',
  month: 'month',
  date: 'date',
};

const defaultStartYear = 2016;
const defaultYearCount = 20;

/**
 */
@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
})
export class NbCalendarComponent<D> implements OnInit {

  @Input()
  value: D;
  
  @Input()
  boundingMonths: boolean = false;
  
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
