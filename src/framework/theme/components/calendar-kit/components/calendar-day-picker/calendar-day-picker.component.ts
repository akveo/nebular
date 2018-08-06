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
  SimpleChanges,
  Type,
} from '@angular/core';

import { NbCalendarMonthModelService } from '../../services';
import { NbCalendarDayCellComponent } from './calendar-day-cell.component';
import { NbCalendarCell, NbCalendarSize } from '../../model';


/**
 * Provides capability pick days.
 * */
@Component({
  selector: 'nb-calendar-day-picker',
  styles: [` :host { display: block; } `],
  template: `
    <nb-calendar-days-names></nb-calendar-days-names>
    <nb-calendar-picker
      [data]="weeks"
      [visibleDate]="visibleDate"
      [selectedValue]="date"
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

  /**
   * Describes which month picker have to render.
   * */
  @Input() visibleDate: Date;

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonths: boolean = true;

  /**
   * Minimum available date for selection.
   * */
  @Input() min: Date;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: Date;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (Date) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarDayCellComponent;

  /**
   * Size of the component.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  /**
   * Already selected date.
   * */
  @Input() date: T;

  /**
   * Fires newly selected date.
   * */
  @Output() dateChange = new EventEmitter<Date>();

  @HostBinding('class.medium')
  get medium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.size === NbCalendarSize.LARGE;
  }

  /**
   * Day picker model.
   * Provides all days in current month and if boundingMonth is true some days
   * from previous and next one.
   * */
  weeks: Date[][];

  constructor(private monthModel: NbCalendarMonthModelService) {
  }

  ngOnChanges({ visibleDate }: SimpleChanges) {
    if (visibleDate) {
      this.weeks = this.monthModel.createDaysGrid(this.visibleDate, this.boundingMonths);
    }
  }

  onSelect(day: Date) {
    this.dateChange.emit(day);
  }
}
