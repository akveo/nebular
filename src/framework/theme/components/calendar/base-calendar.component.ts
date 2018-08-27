/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, HostBinding, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode, NbDateTimeUtil } from '../calendar-kit';


/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
@Component({
  selector: 'nb-base-calendar',
  templateUrl: './base-calendar.component.html',
})
export class NbBaseCalendarComponent<T> {

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonth: boolean = true;

  /**
   * Defines active view for calendar.
   * */
  @Input('startView') activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;

  /**
   * Minimum available date for selection.
   * */
  @Input() min: Date;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: Date;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (Date) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() dayCellComponent: Type<NbCalendarCell<T>>;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() monthCellComponent: Type<NbCalendarCell<T>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() yearCellComponent: Type<NbCalendarCell<T>>;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  /**
   * Value which will be rendered as selected.
   * */
  @Input() date: T;

  /**
   * Emits date when selected.
   * */
  @Output() dateChange: EventEmitter<T> = new EventEmitter();

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
    get large() {
    return this.size === NbCalendarSize.LARGE;
  }

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

  navigateToday() {
    this.setViewMode(NbCalendarViewMode.DATE);
    this.visibleDate = new Date();
  }

  private changeVisibleMonth(direction: number) {
    this.visibleDate = NbDateTimeUtil.addMonth(this.visibleDate, direction);
  }

  private changeVisibleYear(direction: number) {
    this.visibleDate = NbDateTimeUtil.addYear(this.visibleDate, direction * 20);
  }
}
