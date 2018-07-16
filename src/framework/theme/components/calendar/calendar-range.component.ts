/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { CalendarRangeSelectionModel } from './models/calendar-range-selection.model';
import { NbCalendarModelFactoryService } from './models/factory/calendar-model-factory.service';
import { NbCalendarRangeModelFactoryService } from './models/factory/calendar-range-model-factory.service';
import { NbBaseCalendarComponent } from './base-calendar.component';

/**
 */
@Component({
  selector: 'nb-calendar-range',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [{ provide: NbCalendarModelFactoryService, useClass: NbCalendarRangeModelFactoryService }],
})
export class NbCalendarRangeComponent<D> extends NbBaseCalendarComponent<D, CalendarRangeSelectionModel> {

  lastValueEmitted: string = null;

  constructor(dateTimeUtil: NbDateTimeUtil<D>) {
    super(dateTimeUtil);
  }

  protected _getInitialActiveMonthFromValue(): D {
    return (this.selectedValue && (this.selectedValue.endDate || this.selectedValue.startDate)) || this.dateToday;
  }

  onChange(value: D) {
    if (!this.selectedValue || !this.selectedValue.startDate) {
      this.change.emit(new CalendarRangeSelectionModel(value, null));
      this.lastValueEmitted = 's';
    } else  {
      if (!this.selectedValue.endDate) {
        if (this.dateTimeUtil.compareDates(this.selectedValue.startDate, value) > 0) {
          this.change.emit(new CalendarRangeSelectionModel(value, null));
          this.lastValueEmitted = 's';
        } else {
          this.change.emit(new CalendarRangeSelectionModel(this.selectedValue.startDate, value));
          this.lastValueEmitted = 'e';
        }
      } else {
        if (this.lastValueEmitted === 'e') {
          if (this.dateTimeUtil.compareDates(this.selectedValue.endDate, value) >= 0) {
            this.change.emit(new CalendarRangeSelectionModel(value, this.selectedValue.endDate));
            this.lastValueEmitted = 's';
          } else {
            this.change.emit(new CalendarRangeSelectionModel(value, null));
            this.lastValueEmitted = 's';
          }
        } else {
          if (this.dateTimeUtil.compareDates(this.selectedValue.startDate, value) <= 0) {
            this.change.emit(new CalendarRangeSelectionModel(this.selectedValue.startDate, value));
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
