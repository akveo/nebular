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
} from '@angular/core';

import { NbCalendarModelFactoryService } from '../../service/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbCalendarConfig } from '../../calendar-config';
import { NbCalendarCell, NbCalendarDay, NbCalendarMonth, NbCalendarNameStyle } from '../../model';

@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  template: `
    <nb-pageable-calendar-header
      [activeMonth]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (select)="changeMode.emit()">
    </nb-pageable-calendar-header>

    <div class="body">
      <nb-calendar-days-names [days]="days"></nb-calendar-days-names>
      <nb-calendar-week
        *ngFor="let week of month.weeks"
        [week]="week"
        (select)="onSelect($event)">
      </nb-calendar-week>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements OnChanges {

  @Input() activeMonth: D;
  @Input() today: D;
  @Input() selectedValue: D;
  @Input() config: NbCalendarConfig;

  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  @Output() changeMode = new EventEmitter<any>();

  @Output() change = new EventEmitter<D>();

  month: NbCalendarMonth;

  days: NbCalendarDay[];

  constructor(
    private calendarModelFactory: NbCalendarModelFactoryService<D>,
    private dateTimeUtil: NbDateTimeUtil<D>,
  ) {
    this.invalidateNarrowDayNames();
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

  // TODO REFACTOR
  private invalidateNarrowDayNames() {
    const days = this.dateTimeUtil.getDayOfWeekNames(NbCalendarNameStyle.NARROW)
      // TODO maybe we need one more util for cases like that?
      .map((name, i) => ({ name, isHoliday: i % 6 === 0 }));

    for (let i = 0; i < this.dateTimeUtil.getStartOfWeekDay(); i++) {
      days.push(days.shift());
    }
    this.days = days;
  }

  private invalidateModel() {
    this.month = this.calendarModelFactory.createMonthModel({
      activeMonth: this.activeMonth,
      selectedValue: this.selectedValue,
      currentValue: this.today,
      includeBoundingMonths: this.config.displayBoundingMonths,
    });
  }

  private dateFromCell(cell: NbCalendarCell) {
    const year = this.dateTimeUtil.getYear(this.activeMonth);
    const month = this.dateTimeUtil.getMonth(this.activeMonth) + cell.activeMonthDiff;
    const day = cell.date;

    return this.dateTimeUtil.createDate(year, month, day);
  }
}
