/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type, HostBinding } from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';

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
      [size]="size"
      (select)="select.emit($event)"
    >
    </nb-calendar-picker-row>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPickerComponent<D, T> {
  @Input() data: D[][];
  @Input() visibleDate: D;
  @Input() selectedValue: T;
  @Input() cellComponent: Type<NbCalendarCell<D, T>>;
  @Input() min: D;
  @Input() max: D;
  @Input() filter: (D) => boolean;
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select: EventEmitter<D> = new EventEmitter();

  @HostBinding('class.size-large')
  get isLarge(): boolean {
    return this.size === NbCalendarSize.LARGE;
  }
}
