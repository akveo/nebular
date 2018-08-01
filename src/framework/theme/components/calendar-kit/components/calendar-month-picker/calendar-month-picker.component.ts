/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarCell } from '../calendar-cell';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';


@Component({
  selector: 'nb-calendar-month-picker',
  template: `
    <nb-calendar-picker
      [data]="months"
      [selectedValue]="value"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent<T> implements OnInit {

  @Input() value: Date;

  @Output() valueChange: EventEmitter<Date> = new EventEmitter();

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarMonthCellComponent;

  months: Date[][];

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const months: Date[] = range(12).map(i => this.createMonthDateByIndex(i));
    this.months = batch(months, 4);
  }

  onSelect(month: Date) {
    this.valueChange.emit(month);
  }

  private createMonthDateByIndex(i: number): Date {
    return new Date(this.value.getFullYear(), i, this.value.getDate());
  }
}
