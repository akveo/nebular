/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import {
  NbCalendarViewMode,
  NbDateTimeUtil,
  NbCalendarCell,
} from '../calendar-kit';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';


export interface NbCalendarRange {
  start: Date;
  end?: Date;
}

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
      [yearCellComponent]="yearCellComponent">
    </nb-base-calendar>
  `,
})
export class NbCalendarRangeComponent {
  @Input() boundingMonth: boolean = true;

  @Input() startView: NbCalendarViewMode = NbCalendarViewMode.DATE;

  @Input('dayCellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<NbCalendarRange>>) {
    if (cellComponent) {
      this.dayCellComponent = cellComponent;
    }
  }
  dayCellComponent: Type<NbCalendarCell<NbCalendarRange>> = NbCalendarRangeDayCellComponent;

  @Input() monthCellComponent: Type<NbCalendarCell<NbCalendarRange>>;

  @Input() yearCellComponent: Type<NbCalendarCell<NbCalendarRange>>;

  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Input() range: NbCalendarRange;

  @Output() rangeChange: EventEmitter<NbCalendarRange> = new EventEmitter();

  protected onChange(date: Date) {
    this.initDateIfNull();
    this.handleSelected(date);
  }

  private initDateIfNull() {
    if (!this.range) {
      this.range = { start: null, end: null };
    }
  }

  private handleSelected(date: Date) {
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

  private selectStart(start: Date) {
    this.selectRange({ start });
  }

  private selectEnd(date: Date) {
    const { start } = this.range;

    if (NbDateTimeUtil.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  private selectRange(range: NbCalendarRange) {
    this.range = range;
    this.rangeChange.emit(range);
  }
}
