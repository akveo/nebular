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
  OnChanges,
  Output,
  Type,
} from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarCell, NbCalendarSize } from '../../model';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';
import { NbDateService } from '../../services/date.service';

export const YEARS_IN_VIEW = 20;
export const YEARS_IN_COLUMN = 4;

@Component({
  selector: 'nb-calendar-year-picker',
  template: `
    <nb-calendar-picker
      [data]="years"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="date"
      [visibleDate]="year"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<D> implements OnChanges {

  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() filter: (D) => boolean;

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<D, D>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<D, D>> = NbCalendarYearCellComponent;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  @Input() year: D;

  @Output() yearChange = new EventEmitter<D>();

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  years: D[][];

  constructor(protected dateService: NbDateService<D>) {
  }

  ngOnChanges() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.dateService.getYear(this.year);
    const startYear = Math.ceil(selectedYear - YEARS_IN_VIEW / 2);
    const years = range(YEARS_IN_VIEW).map(i => this.createYearDateByIndex(i + startYear));
    this.years = batch(years, YEARS_IN_COLUMN);
  }

  onSelect(year) {
    this.yearChange.emit(year);
  }

  private createYearDateByIndex(i: number): D {
    return this.dateService.createDate(i, this.dateService.getMonth(this.year), this.dateService.getDate(this.year));
  }
}
