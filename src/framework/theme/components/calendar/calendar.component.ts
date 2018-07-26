/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';

import {
  NbCalendarCell,
  NbCalendarCellStatus,
  NbCalendarCellStatusService,
  NbCalendarMonthBuilderContext,
  NbCalendarViewMode,
  NbDateTimeUtil,
} from '../calendar-kit';


@Injectable()
export class NbCalendarBaseCellStateService extends NbCalendarCellStatusService<Date> {
  assignStates(cell: NbCalendarCell, context: NbCalendarMonthBuilderContext<Date>) {
    super.assignStates(cell, context);

    if (context.selectedValue && NbDateTimeUtil.isSameDay(cell.date, context.selectedValue)) {
      cell.status.push(NbCalendarCellStatus.SELECTED);
    }
  }
}

@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [{ provide: NbCalendarCellStatusService, useClass: NbCalendarBaseCellStateService }],
})
export class NbCalendarComponent<T> {

  @Input() date: T;

  @Output() dateChange = new EventEmitter<T>();

  today: Date = new Date();

  ViewMode = NbCalendarViewMode;

  activeMonth: Date = this.today;
  activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setActiveMonth(activeMonth: Date) {
    this.activeMonth = activeMonth;
  }

  prevMonth() {
    this.changeActiveMonth(-1);
  }

  nextMonth() {
    this.changeActiveMonth(1);
  }

  prevYears() {
    // this.activeYear -= 1;
  }

  nextYears() {
    // this.activeYear += 1;
  }

  private changeActiveMonth(direction) {
    this.activeMonth = NbDateTimeUtil.addMonth(this.activeMonth, direction);
  }
}
