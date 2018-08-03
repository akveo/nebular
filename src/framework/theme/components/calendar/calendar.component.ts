/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode } from '../calendar-kit';


/**
 * Calendar component provides capability to choose date.
 *
 * Basic usage example:
 * @stacked-example(Showcase, calendar/calendar-showcase.component)
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
export class NbCalendarComponent<T> {

  @Input() boundingMonth: boolean = true;

  @Input() startView: NbCalendarViewMode = NbCalendarViewMode.DATE;

  @Input() date: T;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input() dayCellComponent: Type<NbCalendarCell<T>>;

  @Input() monthCellComponent: Type<NbCalendarCell<T>>;

  @Input() yearCellComponent: Type<NbCalendarCell<T>>;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  @Output() dateChange: EventEmitter<T> = new EventEmitter();
}
