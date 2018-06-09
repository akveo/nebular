/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';
import { NbCalendarMonthModel } from '../../models/calendar-month.model';

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

  month: NbCalendarMonthModel = null;

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>) {}

  ngOnInit() {
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val: D) {
    if (val) {
      this.month = this.calendarModelFactory.createMonthModel(val, this.includeBoundingMonths, this.currentDate);
    }

    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate'] || changes['includeBoundingMonths']) {
      this.month = this.calendarModelFactory.createMonthModel(this.value, this.includeBoundingMonths, this.currentDate);
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


}
