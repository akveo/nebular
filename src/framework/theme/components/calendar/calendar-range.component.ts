/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode, NbDateService } from '../calendar-kit';
import { NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent } from './calendar-range-cells';


export interface NbCalendarRange<D> {
  start: D;
  end?: D;
}

/**
 * Calendar component provides a capability to choose ranges.
 * For additional info check `NbBaseCalendarComponent`.
 *
 * ```html
 * <nb-calendar-range [(range)]="range"></nb-calendar-range>
 * ```
 */
@Component({
  selector: 'nb-calendar-range',
  template: `
    <nb-base-calendar
      [date]="range"
      (dateChange)="onChange($event)"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [startView]="startView"
      [boundingMonth]="boundingMonth"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [size]="size"
    ></nb-base-calendar>
  `,
})
export class NbCalendarRangeComponent<D> {
  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonth: boolean = true;

  /**
   * Defines starting view for the calendar.
   * */
  @Input() startView: NbCalendarViewMode = NbCalendarViewMode.DATE;

  /**
   * A minimum available date for selection.
   * */
  @Input() min: D;

  /**
   * A maximum available date for selection.
   * */
  @Input() max: D;

  /**
   * A predicate that decides which cells will be disabled.
   * */
  @Input() filter: (D) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input('dayCellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<D, NbCalendarRange<D>>>) {
    if (cellComponent) {
      this.dayCellComponent = cellComponent;
    }
  }
  dayCellComponent: Type<NbCalendarCell<D, NbCalendarRange<D>>> = NbCalendarRangeDayCellComponent;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() monthCellComponent: Type<NbCalendarCell<D, NbCalendarRange<D>>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input('yearCellComponent')
  set _yearCellComponent(cellComponent: Type<NbCalendarCell<D, NbCalendarRange<D>>>) {
    if (cellComponent) {
      this.yearCellComponent = cellComponent;
    }
  }
  yearCellComponent: Type<NbCalendarCell<D, NbCalendarRange<D>>> = NbCalendarRangeYearCellComponent;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;

  /**
   * Range which will be rendered as selected.
   * */
  @Input() range: NbCalendarRange<D>;

  /**
   * Emits range when start selected and emits again when end selected.
   * */
  @Output() rangeChange: EventEmitter<NbCalendarRange<D>> = new EventEmitter();

  constructor(protected dateService: NbDateService<D>) {
  }

  onChange(date: D) {
    this.initDateIfNull();
    this.handleSelected(date);
  }

  private initDateIfNull() {
    if (!this.range) {
      this.range = { start: null, end: null };
    }
  }

  private handleSelected(date: D) {
    if (this.selectionStarted()) {
      this.selectEnd(date);
    } else {
      this.selectStart(date);
    }
  }

  private selectionStarted(): boolean {
    const { start, end } = this.range;
    return start && !end;
  }

  private selectStart(start: D) {
    this.selectRange({ start });
  }

  private selectEnd(date: D) {
    const { start } = this.range;

    if (this.dateService.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  private selectRange(range: NbCalendarRange<D>) {
    this.range = range;
    this.rangeChange.emit(range);
  }
}
