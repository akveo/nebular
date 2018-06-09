/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';
import { NbCalendarMonthModel } from '../../models/calendar-month.model';
import { NbDateTimeUtil } from '@nebular/theme/components/calendar/service/date-time-util.interface';
import { NbCalendarMonthBuilderContext } from '../../models/calendar-month-builder-context';

/**
 */
@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  templateUrl: './calendar-month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements OnInit, OnChanges {

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

  constructor(
    private calendarModelFactory: NbCalendarModelFactoryService<D>,
    private dateTimeUtil: NbDateTimeUtil<D>,
  ) {}

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeMonth) {
      this._invalidateModel()
    }
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
