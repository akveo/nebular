/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarModelFactoryService } from './service/calendar-model-factory.service';
import { NbCalendarRangeModelFactoryService } from './service/calendar-range-model-factory.service';
import { NbBaseCalendarComponent } from './base-calendar.component';
import { NbCalendarRange } from './model';

@Component({
  selector: 'nb-calendar-range',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [{ provide: NbCalendarModelFactoryService, useClass: NbCalendarRangeModelFactoryService }],
})
export class NbCalendarRangeComponent<D> extends NbBaseCalendarComponent<D, NbCalendarRange<D>> {

  lastValueEmitted: string = null;

  constructor(dateTimeUtil: NbDateTimeUtil<D>) {
    super(dateTimeUtil);
  }

  onChange(value: D) {
    if (!this.date || !this.date.start) {
      this.dateChange.emit({ start: value });
      this.lastValueEmitted = 's';
    } else {
      if (!this.date.end) {
        if (this.dateTimeUtil.compareDates(this.date.start, value) > 0) {
          this.dateChange.emit({ start: value });
          this.lastValueEmitted = 's';
        } else {
          this.dateChange.emit({ start: this.date.start, end: value });
          this.lastValueEmitted = 'e';
        }
      } else {
        if (this.lastValueEmitted === 'e') {
          if (this.dateTimeUtil.compareDates(this.date.end, value) >= 0) {
            this.dateChange.emit({ start: value, end: this.date.end });
            this.lastValueEmitted = 's';
          } else {
            this.dateChange.emit({ start: value });
            this.lastValueEmitted = 's';
          }
        } else {
          if (this.dateTimeUtil.compareDates(this.date.start, value) <= 0) {
            this.dateChange.emit({ start: this.date.start, end: value });
            this.lastValueEmitted = 'e';
          } else {
            this.dateChange.emit({ start: value });
            this.lastValueEmitted = 's';
          }
        }
      }
    }
  }

  protected getInitialActiveMonthFromValue(): D {
    return (this.date && (this.date.end || this.date.start)) || this.today;
  }
}
