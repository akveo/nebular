/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarViewMode } from '../calendar-kit';


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

  @Output() dateChange: EventEmitter<T> = new EventEmitter();
}
