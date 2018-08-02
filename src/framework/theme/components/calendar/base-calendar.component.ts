/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarViewMode, NbDateTimeUtil } from '../calendar-kit';


@Component({
  selector: 'nb-base-calendar',
  templateUrl: './base-calendar.component.html',
})
export class NbBaseCalendarComponent<T> {

  @Input() boundingMonth: boolean = true;

  @Input('startView') activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;

  @Input() date: T;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input() dayCellComponent: Type<NbCalendarCell<T>>;

  @Input() monthCellComponent: Type<NbCalendarCell<T>>;

  @Input() yearCellComponent: Type<NbCalendarCell<T>>;

  @Output() dateChange: EventEmitter<T> = new EventEmitter();

  ViewMode = NbCalendarViewMode;

  visibleDate: Date = new Date();

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setVisibleDate(visibleDate: Date) {
    this.visibleDate = visibleDate;
  }

  prevMonth() {
    this.changeVisibleMonth(-1);
  }

  nextMonth() {
    this.changeVisibleMonth(1);
  }

  prevYears() {
    this.changeVisibleYear(-1);
  }

  nextYears() {
    this.changeVisibleYear(1);
  }

  private changeVisibleMonth(direction: number) {
    this.visibleDate = NbDateTimeUtil.addMonth(this.visibleDate, direction);
  }

  private changeVisibleYear(direction: number) {
    this.visibleDate = NbDateTimeUtil.addYear(this.visibleDate, direction * 20);
  }
}
