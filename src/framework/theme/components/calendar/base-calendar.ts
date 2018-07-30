import { ContentChild, EventEmitter, Input, Output } from '@angular/core';

import {
  NbCalendarDayCellDirective,
  NbCalendarMonthCellDirective,
  NbCalendarViewMode,
  NbCalendarYearCellDirective,
  NbDateTimeUtil,
} from '../calendar-kit';


export abstract class NbBaseCalendar<T> {

  @Input() boundingMonth: boolean = true;

  @ContentChild(NbCalendarDayCellDirective) dayCell: NbCalendarDayCellDirective;
  @ContentChild(NbCalendarMonthCellDirective) monthCell: NbCalendarMonthCellDirective;
  @ContentChild(NbCalendarYearCellDirective) yearCell: NbCalendarYearCellDirective;

  value: T;
  valueChange: EventEmitter<T> = new EventEmitter();

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

  protected abstract onChange(date: T);

  private changeActiveMonth(direction: number) {
    const activeMonth = NbDateTimeUtil.addMonth(this.activeMonth, direction);
    this.setActiveMonth(activeMonth);
  }

  private changeActiveYear(direction: number) {
    this.activeYear = NbDateTimeUtil.addYear(this.activeYear, direction * 20);
  }
}
