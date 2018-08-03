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


const defaultYearCount = 20;

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
export class NbCalendarYearPickerComponent implements OnChanges {

  @Input() date: Date;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<any>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarYearCellComponent;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  @Input() year: Date;

  @Output() yearChange = new EventEmitter<Date>();

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  years: Date[][];

  ngOnChanges() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.year.getFullYear();
    const startYear = Math.ceil(selectedYear - defaultYearCount / 2);
    const years = range(defaultYearCount).map(i => this.createYearDateByIndex(i + startYear));
    this.years = batch(years, 4);
  }

  onSelect(year) {
    this.yearChange.emit(year);
  }

  private createYearDateByIndex(i: number): Date {
    return new Date(i, this.year.getMonth(), this.year.getDate());
  }
}
