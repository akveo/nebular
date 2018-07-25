/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarRange } from './model';
import { NbCalendarCellStateService, NbCalendarRangeCellStateService, NbCalendarWeeksFactoryService } from './service';

@Component({
  selector: 'nb-calendar-range',
  template: `
    <nb-base-calendar
      [value]="range"
      (valueChange)="onChange($event)"
      [activeMonth]="activeMonth"
    ></nb-base-calendar>
  `,
  providers: [
    NbCalendarWeeksFactoryService,
    { provide: NbCalendarCellStateService, useClass: NbCalendarRangeCellStateService },
  ],
})
export class NbCalendarRangeComponent {

  @Input() range: NbCalendarRange;
  @Output() rangeChange = new EventEmitter<NbCalendarRange>();

  onChange(date: Date) {
    this.initDateIfNull();
    this.handleSelected(date);
  }

  get activeMonth(): Date {
    return (this.range && (this.range.end || this.range.start));
  }

  private initDateIfNull() {
    if (!this.range) {
      this.range = { start: null, end: null };
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
    const { start, end } = this.range;
    return start && !end;
  }

  private selectStart(start: Date) {
    this.selectRange({ start });
  }

  private selectEnd(date: Date) {
    const { start } = this.range;

    if (NbDateTimeUtil.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  private selectRange(range: NbCalendarRange) {
    this.range = range;
    this.rangeChange.emit(range);
  }
}
