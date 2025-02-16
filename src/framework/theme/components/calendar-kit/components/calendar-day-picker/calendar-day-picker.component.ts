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
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { convertToBoolProperty, NbBooleanInput } from '../../../helpers';


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
      <nb-calendar-days-names [size]="size" [firstDayOfWeek]="firstDayOfWeek"></nb-calendar-days-names>
      <nb-calendar-picker
          [data]="weeks"
          [visibleDate]="visibleDate"
          [selectedValue]="date"
          [cellComponent]="cellComponent"
          [min]="min"
          [max]="max"
          [filter]="filter"
          [size]="size"
          (select)="onSelect($event)">
      </nb-calendar-picker>
    </div>
  `,
    styleUrls: ['./calendar-day-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
  static ngAcceptInputType_size: NbCalendarSizeValues;

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
  static ngAcceptInputType_showWeekNumber: NbBooleanInput;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

  /**
   * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
   * `undefined` means that default locale setting will be used.
   * */
  @Input() firstDayOfWeek: number | undefined;

  /**
   * Fires newly selected date.
   * */
  @Output() dateChange = new EventEmitter<D>();

  @HostBinding('class.size-large')
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

  ngOnChanges({ visibleDate, boundingMonths, firstDayOfWeek }: SimpleChanges) {
    if (visibleDate || boundingMonths || firstDayOfWeek) {
      this.weeks = this.monthModel.createDaysGrid(this.visibleDate, this.boundingMonths, this.firstDayOfWeek);
    }
  }

  onSelect(day: D) {
    this.dateChange.emit(day);
  }
}
