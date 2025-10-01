/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, HostBinding, Input, OnInit, Output, Type } from '@angular/core';

import { NbCalendarYearModelService } from '../calendar-kit/services/calendar-year-model.service';
import {
  NbCalendarCell,
  NbCalendarSize,
  NbCalendarViewMode,
  NbCalendarSizeValues,
  NbCalendarViewModeValues,
} from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
@Component({
  selector: 'nb-base-calendar',
  templateUrl: './base-calendar.component.html',
  standalone: false,
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
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('startView') activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;
  static ngAcceptInputType_activeViewMode: NbCalendarViewModeValues;

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
  static ngAcceptInputType_size: NbCalendarSizeValues;

  @Input() visibleDate: D;

  /**
   * Determines whether we should show calendar navigation or not.
   * */
  @Input()
  @HostBinding('class.has-navigation')
  showNavigation: boolean = true;

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
  static ngAcceptInputType_showWeekNumber: NbBooleanInput;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

  /**
   * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
   * `undefined` means that default locale setting will be used.
   * */
  @Input() firstDayOfWeek: number | undefined;

  /**
   * Emits date when selected.
   * */
  @Output() dateChange: EventEmitter<T> = new EventEmitter();

  constructor(protected dateService: NbDateService<D>, protected yearModelService: NbCalendarYearModelService<D>) {}

  ngOnInit() {
    if (!this.visibleDate) {
      this.visibleDate = this.dateService.today();
    }
  }

  @HostBinding('class.size-large')
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

  prevYear() {
    this.changeVisibleYear(-1);
  }

  nextYear() {
    this.changeVisibleYear(1);
  }

  prevYears() {
    this.changeVisibleYears(-1);
  }

  nextYears() {
    this.changeVisibleYears(1);
  }

  navigatePrev() {
    switch (this.activeViewMode) {
      case NbCalendarViewMode.DATE:
        return this.prevMonth();
      case NbCalendarViewMode.MONTH:
        return this.prevYear();
      case NbCalendarViewMode.YEAR:
        return this.prevYears();
    }
  }

  navigateNext() {
    switch (this.activeViewMode) {
      case NbCalendarViewMode.DATE:
        return this.nextMonth();
      case NbCalendarViewMode.MONTH:
        return this.nextYear();
      case NbCalendarViewMode.YEAR:
        return this.nextYears();
    }
  }

  onChangeViewMode() {
    if (this.activeViewMode === NbCalendarViewMode.DATE) {
      return this.setViewMode(NbCalendarViewMode.YEAR);
    }

    this.setViewMode(NbCalendarViewMode.DATE);
  }

  private changeVisibleMonth(direction: number) {
    this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
  }

  private changeVisibleYear(direction: number) {
    this.visibleDate = this.dateService.addYear(this.visibleDate, direction);
  }

  private changeVisibleYears(direction: number) {
    this.visibleDate = this.dateService.addYear(this.visibleDate, direction * this.yearModelService.getYearsInView());
  }
}
