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

@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  template: `
    <nb-days-names [days]="days"></nb-days-names>
    <nb-week
      *ngFor="let week of month.weeks"
      [week]="week"
      (cellSelect)="onCellSelect($event)"
    ></nb-week>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements OnChanges {

  @Input()
  activeMonth: D;

  @Input()
  public includeBoundingMonths: boolean = true;

  @Input()
  public currentDate: D = null;

  @Input()
  public selectedValue: D = null;

  @Output()
  public change = new EventEmitter<D>();

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
      this._invalidateModel();
    }
  }

  private invalidateShortDayNames() {
    const days = this.dateTimeUtil.getDayOfWeekNames('narrow')
      .map((name, i) => ({ name, isHoliday: i % 6 === 0 }) );
    for (let i = 0; i < this.dateTimeUtil.getStartOfWeekDay(); i++) {
      days.push(days.shift());
    }
    this.days = days;
  }

  private _invalidateModel() {
    const context = new NbCalendarMonthBuilderContext<D>(
      this.activeMonth,
      this.selectedValue,
      this.currentDate,
      this.includeBoundingMonths,
    );

    this.month = this.calendarModelFactory.createMonthModel(context);
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
}
