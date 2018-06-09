/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';

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
export class NbCalendarMonthViewComponent<D> implements ControlValueAccessor, OnInit {
  
  @Input('value') _value: D = null;

  @Input()
  public includeBoundingMonths: boolean = true;

  @Input()
  public currentDate: D = null;

  months = [];

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
      this.months = this.calendarModelFactory.createMonthModel(val, this.includeBoundingMonths);
    }
  
    this._value = val;
    this.onChange(val);
    this.onTouched();
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
