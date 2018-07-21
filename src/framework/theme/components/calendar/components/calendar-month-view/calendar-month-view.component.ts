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

import { NbCalendarModelFactoryService } from '../../models/factory/calendar-model-factory.service';
import { NbCalendarMonthModel } from '../../models/calendar-month.model';
import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbCalendarMonthBuilderContext } from '../../models/calendar-month-builder-context';
import { Day } from '../../models/day';
import { NbCalendarConfig } from '../../calendar-config';

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
      <nb-calendar-month-view-header [days]="days"></nb-calendar-month-view-header>
      <nb-calendar-week
        *ngFor="let week of month.weeks"
        [week]="week"
        (cellSelect)="onCellSelect($event)">
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

  month: NbCalendarMonthModel = new NbCalendarMonthModel([], []);

  days: Day[];

  constructor(
    private calendarModelFactory: NbCalendarModelFactoryService<D>,
    private dateTimeUtil: NbDateTimeUtil<D>,
  ) {
    this.invalidateShortDayNames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeMonth) {
      this.invalidateModel();
    }
  }

  onCellSelect(event) {
    this.change.emit(
      this.dateTimeUtil.createDate(
        this.dateTimeUtil.getYear(this.activeMonth),
        this.dateTimeUtil.getMonth(this.activeMonth) + event.activeMonthDiff,
        event.date,
      ),
    );
  }

  private invalidateShortDayNames() {
    const days = this.dateTimeUtil.getDayOfWeekNames('narrow')
      .map((name, i) => ({ name, isHoliday: i % 6 === 0 }));
    for (let i = 0; i < this.dateTimeUtil.getStartOfWeekDay(); i++) {
      days.push(days.shift());
    }
    this.days = days;
  }

  private invalidateModel() {
    const context = new NbCalendarMonthBuilderContext<D>(
      this.activeMonth,
      this.selectedValue,
      this.today,
      this.config.displayBoundingMonths,
    );

    this.month = this.calendarModelFactory.createMonthModel(context);
  }
}
