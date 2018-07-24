/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { NbCalendarModelFactoryService } from '../../service/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbCalendarCell, NbCalendarMonth } from '../../model';

@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  template: `
    <nb-calendar-pageable-navigation
      [date]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (click)="changeMode.emit()">
    </nb-calendar-pageable-navigation>

    <div class="body">
      <nb-calendar-days-names></nb-calendar-days-names>
      <nb-calendar-week
        *ngFor="let week of month.weeks"
        [week]="week"
        (click)="onSelect($event)">
      </nb-calendar-week>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements OnChanges {

  @Input() activeMonth: D;
  @Input() today: D;
  @Input() selectedValue: D;
  @Input() displayBoundingMonths: boolean = true;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() changeMode = new EventEmitter<void>();

  @Output() change = new EventEmitter<D>();

  month: NbCalendarMonth;

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>,
              private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnChanges() {
    if (this.activeMonth) {
      this.invalidateModel();
    }
  }

  onSelect(cell: NbCalendarCell) {
    const date = this.dateFromCell(cell);
    this.change.emit(date);
  }

  private invalidateModel() {
    this.month = this.calendarModelFactory.createMonthModel({
      activeMonth: this.activeMonth,
      selectedValue: this.selectedValue,
      currentValue: this.today,
      includeBoundingMonths: this.displayBoundingMonths,
    });
  }

  private dateFromCell(cell: NbCalendarCell) {
    const year = this.dateTimeUtil.getYear(this.activeMonth);
    const month = this.dateTimeUtil.getMonth(this.activeMonth) + cell.activeMonthDiff;
    const day = cell.date;

    return this.dateTimeUtil.createDate(year, month, day);
  }
}
