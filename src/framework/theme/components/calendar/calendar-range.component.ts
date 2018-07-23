/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input('range') date: NbCalendarRange<D>;
  @Output('rangeChange') dateChange = new EventEmitter<any>();

  constructor(protected dateTimeUtil: NbDateTimeUtil<D>) {
    super(dateTimeUtil);
  }

  onDateChange(date: D) {
    this.initDateIfNull();
    this.handleSelected(date);
  }

  protected getInitialActiveMonthFromValue(): D {
    return (this.date && (this.date.end || this.date.start)) || this.today;
  }

  private initDateIfNull() {
    if (!this.date) {
      this.date = { start: null, end: null };
    }
  }

  private handleSelected(date: D) {
    if (this.selectionStarted()) {
      this.selectEnd(date);
    } else {
      this.selectStart(date);
    }
  }

  private selectionStarted(): boolean {
    const { start, end } = this.date;
    return start && !end;
  }

  private selectStart(start: D) {
    this.selectRange({ start });
  }

  private selectEnd(date: D) {
    const { start } = this.date;

    if (this.dateTimeUtil.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  private selectRange(range: NbCalendarRange<D>) {
    this.date = range;
    this.dateChange.emit(range);
  }
}
