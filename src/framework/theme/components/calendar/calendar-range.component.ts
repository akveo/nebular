/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util.interface';
import { CalendarRangeSelectionModel } from './models/calendar-range-selection.model';
import { NbCalendarModelFactoryService } from './models/factory/calendar-model-factory.service';
import { NbCalendarRangeModelFactoryService } from './models/factory/calendar-range-model-factory.service';

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
  selector: 'nb-calendar-range',
  styleUrls: ['./calendar-range.component.scss'],
  templateUrl: './calendar-range.component.html',
  providers: [{ provide: NbCalendarModelFactoryService, useClass: NbCalendarRangeModelFactoryService }],
})
export class NbCalendarRangeComponent<D> implements OnInit {

  @Input()
  value: CalendarRangeSelectionModel;

  @Input()
  boundingMonths: boolean = false;

  @Output()
  change = new EventEmitter<CalendarRangeSelectionModel>();

  currentDate: D;

  newValue: D;

  ViewMode = ViewMode;
  viewMode = ViewMode.date;

  startYear = defaultStartYear;
  yearCount = defaultYearCount;

  lastValueEmitted = null;

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.currentDate = this.dateTimeUtil.createNowDate();
    this.newValue = (this.value && (this.value.endDate || this.value.startDate)) || this.currentDate;
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

  onChange(value: D) {
    if (!this.value || !this.value.startDate) {
      this.change.emit(new CalendarRangeSelectionModel(value, null));
      this.lastValueEmitted = 's';
    } else  {
      if (!this.value.endDate) {
        if (this.dateTimeUtil.compareDates(this.value.startDate, value) > 0) {
          this.change.emit(new CalendarRangeSelectionModel(value, null));
          this.lastValueEmitted = 's';
        } else {
          this.change.emit(new CalendarRangeSelectionModel(this.value.startDate, value));
          this.lastValueEmitted = 'e';
        }
      } else {
        if (this.lastValueEmitted === 'e') {
          if (this.dateTimeUtil.compareDates(this.value.endDate, value) >= 0) {
            this.change.emit(new CalendarRangeSelectionModel(value, this.value.endDate));
            this.lastValueEmitted = 's';
          } else {
            this.change.emit(new CalendarRangeSelectionModel(value, null));
            this.lastValueEmitted = 's';
          }
        } else {
          if (this.dateTimeUtil.compareDates(this.value.startDate, value) <= 0) {
            this.change.emit(new CalendarRangeSelectionModel(this.value.startDate, value));
            this.lastValueEmitted = 'e';
          } else {
            this.change.emit(new CalendarRangeSelectionModel(value, null));
            this.lastValueEmitted = 's';
          }
        }
      }
    }
  }
}
