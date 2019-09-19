/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, HostBinding, Input, OnInit, Output, Type } from '@angular/core';

import { YEARS_IN_VIEW } from '../calendar-kit/components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode } from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { convertToBoolProperty } from '../helpers';

/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
@Component({
  selector: 'nb-base-calendar',
  templateUrl: './base-calendar.component.html',
})
export class NbBaseCalendarComponent<D, T> implements OnInit {

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
  @Input() min: D;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: D;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (D) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() dayCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() monthCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() yearCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  @Input() visibleDate: D;

  /**
   * Determines should we show calendars header or not.
   * */
  @Input() showHeader: boolean = true;

  /**
   * Value which will be rendered as selected.
   * */
  @Input() date: T;

  /**
   * Determines should we show week numbers column.
   * False by default.
   * */
  @Input()
  @HostBinding('class.has-week-number')
  get showWeekNumber(): boolean {
    return this._showWeekNumber;
  }
  set showWeekNumber(value: boolean) {
    this._showWeekNumber = convertToBoolProperty(value);
  }
  protected _showWeekNumber = false;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

  /**
   * Emits date when selected.
   * */
  @Output() dateChange: EventEmitter<T> = new EventEmitter();

  constructor(protected dateService: NbDateService<D>) {
  }

  ngOnInit() {
    if (!this.visibleDate) {
      this.visibleDate = this.dateService.today();
    }
  }

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
    get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  ViewMode = NbCalendarViewMode;

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setVisibleDate(visibleDate: D) {
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
    this.visibleDate = this.dateService.today();
  }

  private changeVisibleMonth(direction: number) {
    this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
  }

  private changeVisibleYear(direction: number) {
    this.visibleDate = this.dateService.addYear(this.visibleDate, direction * YEARS_IN_VIEW);
  }
}
