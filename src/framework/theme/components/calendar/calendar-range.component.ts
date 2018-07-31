/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import {
  NbCalendarDayCellDirective,
  NbCalendarMonthCellDirective,
  NbCalendarYearCellDirective,
  NbDateTimeUtil,
} from '../calendar-kit';


export interface NbCalendarRange {
  start: Date;
  end?: Date;
}

@Component({
  selector: 'nb-calendar-range',
  template: `
    <nb-calendar
      [date]="range"
      (dateChange)="onChange($event)"
      [boundingMonth]="boundingMonth">

      <ng-container *ngIf="dayCell; else defaultDayCell">
        <ng-container *nbCalendarDay="let context">
          <ng-container *ngTemplateOutlet="dayCell.template; context: {$implicit: context}"></ng-container>
        </ng-container>
      </ng-container>

      <ng-template #defaultDayCell>
        <nb-calendar-range-day-cell
          *nbCalendarDay="let context"
          [selectedValue]="context.selectedValue"
          [date]="context.date"
          [activeMonth]="context.activeMonth">
        </nb-calendar-range-day-cell>
      </ng-template>

      <ng-container *ngIf="yearCell">
        <ng-container *nbCalendarYear="let context">
          <ng-container *ngTemplateOutlet="yearCell.template; context: {$implicit: context}"></ng-container>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="monthCell">
        <ng-container *nbCalendarMonth="let context">
          <ng-container *ngTemplateOutlet="monthCell.template; context: {$implicit: context}"></ng-container>
        </ng-container>
      </ng-container>

    </nb-calendar>
  `,
})
export class NbCalendarRangeComponent {
  @Input() boundingMonth: boolean = true;
  @Input() range: NbCalendarRange;
  @Output() rangeChange: EventEmitter<NbCalendarRange> = new EventEmitter();

  @ContentChild(NbCalendarDayCellDirective) dayCell: NbCalendarDayCellDirective;
  @ContentChild(NbCalendarMonthCellDirective) monthCell: NbCalendarMonthCellDirective;
  @ContentChild(NbCalendarYearCellDirective) yearCell: NbCalendarYearCellDirective;

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
