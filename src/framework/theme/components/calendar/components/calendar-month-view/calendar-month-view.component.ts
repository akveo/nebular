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
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCalendarMonthViewComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements ControlValueAccessor, OnInit, OnChanges {

  @Input('value') _value: D = null;

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

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): D {
    return this._value;
  }

  set value(val: D) {
    this._value = val;
    if (val) {
      this._invalidateModel();
    }

    this.onChange(val);
    this.onTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Fixme: optimization
    if (this.value) {
      this._invalidateModel()
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(val: D) {
    this.value = val;
  }

  private _invalidateModel() {
    const context = new NbCalendarMonthBuilderContext<D>(
      this.value,
      this.selectedValue,
      this.currentDate,
      this.includeBoundingMonths,
    );

    this.month = this.calendarModelFactory.createMonthModel(context);
  }

  onCellSelect(event) {
    this.change.emit(
      this.dateTimeUtil.createDate(
        this.dateTimeUtil.getYear(this.value),
        this.dateTimeUtil.getMonth(this.value) + event.activeMonthDiff,
        event.date,
      ),
    );
  }


}
