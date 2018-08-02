/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-picker',
  template: `
    <nb-calendar-picker-row
      *ngFor="let row of data"
      [row]="row"
      [visibleDate]="visibleDate"
      [selectedValue]="selectedValue"
      [component]="cellComponent"
      [min]="min"
      [max]="max"
      [filter]="filter"
      (select)="select.emit($event)">
    </nb-calendar-picker-row>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPickerComponent<T> {
  @Input() data: Date[][];
  @Input() visibleDate: Date;
  @Input() selectedValue: T;
  @Input() cellComponent: Type<NbCalendarCell<T>>;
  @Input() min: Date;
  @Input() max: Date;
  @Input() filter: (Date) => boolean;
  @Output() select: EventEmitter<Date> = new EventEmitter();
}
