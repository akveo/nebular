/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { NbCalendarViewMode, NbDateTimeUtil } from '../calendar-kit';
import { NbCalendarCellDirective } from '@nebular/theme/components/calendar-kit/components/calendar-cell-def';


@Component({
  selector: 'nb-calendar',
  templateUrl: './calendar.component.html',
})
export class NbCalendarComponent<T> {

  @Input() date: T;

  @Input() boundingMonth: boolean = true;

  @Output() dateChange = new EventEmitter<T>();

  @ContentChild(NbCalendarCellDirective) cell: NbCalendarCellDirective;

  ViewMode = NbCalendarViewMode;

  activeMonth: Date = new Date();
  activeYear: Date = new Date();

  activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;

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
