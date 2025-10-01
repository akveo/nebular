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
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';
import { NbDateService } from '../../services/date.service';
import { NbCalendarYearModelService } from '../../services/calendar-year-model.service';

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
      [size]="size"
      (select)="onSelect($event)"
    >
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbCalendarYearPickerComponent<D> implements OnChanges {
  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() filter: (D) => boolean;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<D, D>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<D, D>> = NbCalendarYearCellComponent;

  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;

  @Input() year: D;

  @Output() yearChange = new EventEmitter<D>();

  @HostBinding('class.size-large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  years: D[][];

  constructor(protected dateService: NbDateService<D>, protected yearModelService: NbCalendarYearModelService<D>) {}

  ngOnChanges() {
    this.years = this.yearModelService.getViewYears(this.year);
  }

  onSelect(year) {
    this.yearChange.emit(year);
  }
}
