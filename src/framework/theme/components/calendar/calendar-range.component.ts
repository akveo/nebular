/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbBaseCalendarComponent } from './base-calendar.component';
import { NbCalendarRange } from './model';
import { NbCalendarCellStateService, NbCalendarRangeCellStateService, NbCalendarWeeksFactoryService } from './service';

@Component({
  selector: 'nb-calendar-range',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [
    NbCalendarWeeksFactoryService,
    { provide: NbCalendarCellStateService, useClass: NbCalendarRangeCellStateService },
  ],
})
export class NbCalendarRangeComponent extends NbBaseCalendarComponent<NbCalendarRange> {

  @Input('range') date: NbCalendarRange;
  @Output('rangeChange') dateChange = new EventEmitter<any>();

  onDateChange(date: Date) {
    this.initDateIfNull();
    this.handleSelected(date);
  }

  protected getInitialActiveMonthFromValue(): Date {
    return (this.date && (this.date.end || this.date.start)) || this.today;
  }

  private initDateIfNull() {
    if (!this.date) {
      this.date = { start: null, end: null };
    }
  }

  private handleSelected(date: Date) {
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

  private selectStart(start: Date) {
    this.selectRange({ start });
  }

  private selectEnd(date: Date) {
    const { start } = this.date;

    if (NbDateTimeUtil.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  private selectRange(range: NbCalendarRange) {
    this.date = range;
    this.dateChange.emit(range);
  }
}
