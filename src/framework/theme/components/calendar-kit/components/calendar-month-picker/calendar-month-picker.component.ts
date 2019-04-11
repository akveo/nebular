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
import { NbDateService } from '../../services';

export const MONTHS_IN_VIEW = 12;
export const MONTHS_IN_COLUMN = 4;

@Component({
  selector: 'nb-calendar-month-picker',
  templateUrl: './calendar-month-picker.component.html',
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
    const months: D[] = range(MONTHS_IN_VIEW).map(i => this.createMonthDateByIndex(i));
    this.months = batch(months, MONTHS_IN_COLUMN);
  }

  onSelect(month: D) {
    this.monthChange.emit(month);
  }

  private createMonthDateByIndex(i: number): D {
    return this.dateService.createDate(this.dateService.getYear(this.month), i, this.dateService.getDate(this.month));
  }
}
