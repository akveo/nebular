/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode } from '../calendar-kit';


/**
 * Calendar component provides a capability to choose a date.
 *
 * ```html
 * <nb-calendar [(date)]="date"></nb-calendar>
 * ```
 *
 * Basic usage example
 * @stacked-example(Showcase, calendar/calendar-showcase.component)
 *
 * If you want to select ranges you can use `NbCalendarRangeComponent`.
 * In order to use it, you have to import `NbCalendarRangeModule`.
 * @stacked-example(Range, calendar/calendar-range-showcase.component)
 *
 * As you can see in the basic usage example calendar contains previous and next month days
 * which can be disabled using `boundingMonth` property.
 * @stacked-example(Bounding months, calendar/calendar-bounding-month.component)
 *
 * You can define starting view of the calendar by setting `startView` property.
 * Available values: year, month and date.
 * @stacked-example(Start view, calendar/calendar-start-view.component)
 *
 * You can use a larger version of the calendar by defining size property.
 * Available values: medium(which is default) and large.
 * @stacked-example(Size, calendar/calendar-size.component)
 *
 * Calendar supports min and max dates which disables values out of min-max range.
 * @stacked-example(Borders, calendar/calendar-min-max.component)
 *
 * Also, you can define custom filter property that should be predicate which receives
 * date and returns false if this date has to be disabled. In this example, we provide the filter
 * which disables weekdays.
 * @stacked-example(Filter, calendar/calendar-filter.component)
 *
 * If you need create custom cells you can easily provide custom components for
 * calendar. For examples if you want to show any average price under each date you can
 * just provide custom `dayCellComponent`. Custom cells for month and year can be provided
 * the same way, check API reference.
 * @stacked-example(Custom day cell, calendar/calendar-custom-day-cell-showcase.component)
 *
 * @styles
 *
 * calendar-width
 * calendar-height
 * calendar-header-title-font-size
 * calendar-header-title-font-weight
 * calendar-header-sub-title-font-size
 * calendar-header-sub-title-font-weight
 * calendar-navigation-button-width
 * calendar-selected-item-bg
 * calendar-hover-item-bg
 * calendar-today-item-bg
 * calendar-active-item-bg
 * calendar-fg
 * calendar-selected-fg
 * calendar-day-cell-width
 * calendar-day-cell-height
 * calendar-month-cell-width
 * calendar-month-cell-height
 * calendar-year-cell-width
 * calendar-year-cell-height
 * calendar-inactive-opacity
 * calendar-disabled-opacity
 * calendar-border-radius
 * calendar-weekday-width
 * calendar-weekday-height
 * calendar-weekday-font-size
 * calendar-weekday-font-weight
 * calendar-weekday-fg
 * calendar-weekday-holiday-fg
 * calendar-range-bg-in-range
 * calendar-large-width
 * calendar-large-height
 * calendar-day-cell-large-width
 * calendar-day-cell-large-height
 * calendar-month-cell-large-width
 * calendar-month-cell-large-height
 * calendar-year-cell-large-width
 * calendar-year-cell-large-height
 * */
@Component({
  selector: 'nb-calendar',
  template: `
    <nb-base-calendar
      [boundingMonth]="boundingMonth"
      [startView]="startView"
      [date]="date"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [size]="size"
      (dateChange)="dateChange.emit($event)"
    ></nb-base-calendar>
  `,
})
export class NbCalendarComponent {

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonth: boolean = true;

  /**
   * Defines starting view for calendar.
   * */
  @Input() startView: NbCalendarViewMode = NbCalendarViewMode.DATE;

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
  @Input() dayCellComponent: Type<NbCalendarCell<Date>>;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() monthCellComponent: Type<NbCalendarCell<Date>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() yearCellComponent: Type<NbCalendarCell<Date>>;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  /**
   * Date which will be rendered as selected.
   * */
  @Input() date: Date;

  /**
   * Emits date when selected.
   * */
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();
}
