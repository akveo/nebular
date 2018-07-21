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
    if (!this.selectedValue || !this.selectedValue.start) {
      this.change.emit({ start: value });
      this.lastValueEmitted = 's';
    } else {
      if (!this.selectedValue.end) {
        if (this.dateTimeUtil.compareDates(this.selectedValue.start, value) > 0) {
          this.change.emit({ start: value });
          this.lastValueEmitted = 's';
        } else {
          this.change.emit({ start: this.selectedValue.start, end: value });
          this.lastValueEmitted = 'e';
        }
      } else {
        if (this.lastValueEmitted === 'e') {
          if (this.dateTimeUtil.compareDates(this.selectedValue.end, value) >= 0) {
            this.change.emit({ start: value, end: this.selectedValue.end });
            this.lastValueEmitted = 's';
          } else {
            this.change.emit({ start: value });
            this.lastValueEmitted = 's';
          }
        } else {
          if (this.dateTimeUtil.compareDates(this.selectedValue.start, value) <= 0) {
            this.change.emit({ start: this.selectedValue.start, end: value });
            this.lastValueEmitted = 'e';
          } else {
            this.change.emit({ start: value });
            this.lastValueEmitted = 's';
          }
        }
      }
    }
  }

  protected getInitialActiveMonthFromValue(): D {
    return (this.selectedValue && (this.selectedValue.end || this.selectedValue.start)) || this.today;
  }
}
