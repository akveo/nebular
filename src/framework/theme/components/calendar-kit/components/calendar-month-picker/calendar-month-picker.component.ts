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
import { batch } from '../../helpers';
import { NbCalendarCell, NbCalendarSize } from '../../model';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';
import { NbDateService } from '../../services/date.service';

export const MONTHS_IN_VIEW = 12;
export const MONTHS_IN_COLUMN = 4;

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
export class NbCalendarMonthPickerComponent<D, T> implements OnInit {

  @Input() min: D;

  @Input() max: D;

  @Input() filter: (D) => boolean;
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  @Input() month: D;
  @Output() monthChange: EventEmitter<D> = new EventEmitter();
  months: D[][];

  constructor(protected dateService: NbDateService<D>) {
  }

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<D, T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any, any>> = NbCalendarMonthCellComponent;

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const date = this.dateService.getDate(this.month);
    const year = this.dateService.getYear(this.month);
    const firstMonth = this.dateService.createDate(year, 0, date);
    const months = [ firstMonth ];

    for (let monthIndex = 1; monthIndex < MONTHS_IN_VIEW; monthIndex++) {
      months.push(this.dateService.addMonth(firstMonth, monthIndex));
    }

    this.months = batch(months, MONTHS_IN_COLUMN);
  }

  onSelect(month: D) {
    this.monthChange.emit(month);
  }
}
