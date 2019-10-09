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

import { NbCalendarMonthModelService } from '../../services/calendar-month-model.service';
import { NbCalendarDayCellComponent } from './calendar-day-cell.component';
import { NbCalendarCell, NbCalendarSize } from '../../model';
import { convertToBoolProperty } from '../../../helpers';


/**
 * Provides capability pick days.
 * */
@Component({
  selector: 'nb-calendar-day-picker',
  template: `
    <nb-calendar-week-numbers *ngIf="showWeekNumber"
                              [weeks]="weeks"
                              [size]="size"
                              [weekNumberSymbol]="weekNumberSymbol">
    </nb-calendar-week-numbers>
    <div class="days-container">
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
    </div>
  `,
  styleUrls: ['./calendar-day-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayPickerComponent<D, T> implements OnChanges {

  /**
   * Describes which month picker have to render.
   * */
  @Input() visibleDate: D;

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonths: boolean = true;

  /**
   * Minimum available date for selection.
   * */
  @Input() min: D;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: D;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (D) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input('cellComponent')
  set setCellComponent(cellComponent: Type<NbCalendarCell<D, T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any, any>> = NbCalendarDayCellComponent;

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
   * Determines should we show week numbers column.
   * False by default.
   * */
  @Input()
  get showWeekNumber(): boolean {
    return this._showWeekNumber;
  }
  set showWeekNumber(value: boolean) {
    this._showWeekNumber = convertToBoolProperty(value);
  }
  protected _showWeekNumber: boolean = false;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

  /**
   * Fires newly selected date.
   * */
  @Output() dateChange = new EventEmitter<D>();

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
  weeks: D[][];

  constructor(private monthModel: NbCalendarMonthModelService<D>) {
  }

  ngOnChanges({ visibleDate }: SimpleChanges) {
    if (visibleDate) {
      this.weeks = this.monthModel.createDaysGrid(this.visibleDate, this.boundingMonths);
    }
  }

  onSelect(day: D) {
    this.dateChange.emit(day);
  }
}
