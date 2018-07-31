/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import {
  NbCalendarDayCellDirective,
  NbCalendarMonthCellDirective,
  NbCalendarViewMode,
  NbCalendarYearCellDirective,
  NbDateTimeUtil,
} from '../calendar-kit';


@Component({
  selector: 'nb-calendar',
  templateUrl: './calendar.component.html',
})
export class NbCalendarComponent<T> {

  @Input() boundingMonth: boolean = true;

  @Input('startView') activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;

  @Input() date: T;

  @Output() dateChange: EventEmitter<T> = new EventEmitter();

  @ContentChild(NbCalendarDayCellDirective) dayCell: NbCalendarDayCellDirective;
  @ContentChild(NbCalendarMonthCellDirective) monthCell: NbCalendarMonthCellDirective;
  @ContentChild(NbCalendarYearCellDirective) yearCell: NbCalendarYearCellDirective;

  ViewMode = NbCalendarViewMode;

  activeMonth: Date = new Date();
  activeYear: Date = new Date();

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setActiveMonth(activeMonth: Date) {
    this.activeMonth = activeMonth;
    this.activeYear = activeMonth;
  }

  prevMonth() {
    this.changeActiveMonth(-1);
  }

  nextMonth() {
    this.changeActiveMonth(1);
  }

  prevYears() {
    this.changeActiveYear(-1);
  }

  nextYears() {
    this.changeActiveYear(1);
  }

  private changeActiveMonth(direction: number) {
    const activeMonth = NbDateTimeUtil.addMonth(this.activeMonth, direction);
    this.setActiveMonth(activeMonth);
  }

  private changeActiveYear(direction: number) {
    this.activeYear = NbDateTimeUtil.addYear(this.activeYear, direction * 20);
  }
}
