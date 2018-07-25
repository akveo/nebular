/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbDateTimeUtil } from '../../service';
import { NbCalendarViewMode } from '../../model';

@Component({
  selector: 'nb-base-calendar',
  styleUrls: ['./base-calendar.component.scss'],
  templateUrl: './base-calendar.component.html',
})
export class NbBaseCalendarComponent<T> {

  @Input() value: T;

  @Output() valueChange = new EventEmitter<T>();

  today: Date = new Date();

  ViewMode = NbCalendarViewMode;

  activeMonth: Date = this.today;
  activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;
  activeYear: number;

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
    this.activeYear -= 1;
  }

  nextYears() {
    this.activeYear += 1;
  }

  private changeActiveMonth(direction) {
    this.activeMonth = NbDateTimeUtil.addMonth(this.activeMonth, direction);
  }
}
