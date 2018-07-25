/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarBaseCellStateService, NbCalendarCellStateService, NbCalendarWeeksFactoryService } from './service';

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
  template: `
    <nb-base-calendar
      [value]="date"
      (valueChange)="onChange($event)"
      [activeMonth]="date">
    </nb-base-calendar>
  `,
  providers: [
    NbCalendarWeeksFactoryService,
    { provide: NbCalendarCellStateService, useClass: NbCalendarBaseCellStateService },
  ],
})
export class NbCalendarComponent {
  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  onChange(date: Date) {
    this.date = date;
    this.dateChange.emit(date);
  }
}
