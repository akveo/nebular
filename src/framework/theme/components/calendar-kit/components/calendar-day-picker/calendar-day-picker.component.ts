/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';

import { NbCalendarMonthModelService } from '../../services';
import { NbCalendarDayCellComponent } from './calendar-day-cell.component';
import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-day-picker',
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <nb-calendar-days-names></nb-calendar-days-names>
    <nb-calendar-picker
      [data]="weeks"
      [activeMonth]="activeMonth"
      [selectedValue]="value"
      [cellComponent]="cellComponent"
      [min]="min"
      [max]="max"
      [filter]="filter"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayPickerComponent<T> implements OnChanges {

  @Input() activeMonth: Date;

  @Input() value: T;

  @Input() boundingMonths: boolean = true;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarDayCellComponent;

  @Output() valueChange = new EventEmitter<Date>();

  weeks: Date[][];

  constructor(private monthModel: NbCalendarMonthModelService<T>) {
  }

  ngOnChanges({ activeMonth }: SimpleChanges) {
    if (activeMonth) {
      this.invalidateModel();
    }
  }

  onSelect(day: Date) {
    this.valueChange.emit(day);
  }

  private invalidateModel() {
    this.weeks = this.monthModel.createDaysGrid(this.activeMonth, this.boundingMonths);
  }
}
