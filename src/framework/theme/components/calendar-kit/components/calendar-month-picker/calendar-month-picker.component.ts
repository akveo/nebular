/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Type,
} from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarCell, NbCalendarSize } from '../../model';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';


@Component({
  selector: 'nb-calendar-month-picker',
  template: `
    <nb-calendar-picker
      [data]="months"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="month"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent implements OnInit {

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<any>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarMonthCellComponent;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  @Input() month: Date;

  @Output() monthChange: EventEmitter<Date> = new EventEmitter();

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  months: Date[][];

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const months: Date[] = range(12).map(i => this.createMonthDateByIndex(i));
    this.months = batch(months, 4);
  }

  onSelect(month: Date) {
    this.monthChange.emit(month);
  }

  private createMonthDateByIndex(i: number): Date {
    return new Date(this.month.getFullYear(), i, this.month.getDate());
  }
}
