/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const defaultMinYear = 1900;
const defaultMaxYearOffset = 20;

/**
 */
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  templateUrl: './calendar-year-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCalendarYearPickerComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<D> implements ControlValueAccessor, OnInit, OnChanges {
  
  @Input('value')
  _value: D;
  
  @Input()
  public minYear: D;
  
  @Input()
  public maxYear: D;

  @Input()
  public currentDate: D;
  
  private years = [];

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>,
              private dateTimeUtil: NbDateTimeUtil<D>) {}

  ngOnInit() {
    this.currentDate = this.currentDate || this.dateTimeUtil.createNowDate();

    this.minYear = this.minYear || this.dateTimeUtil.createDate(
      defaultMinYear,
      this.dateTimeUtil.getMonth(this.currentDate),
      this.dateTimeUtil.getDate(this.currentDate));
    
    this.maxYear = this.minYear || this.dateTimeUtil.createDate(
      this.dateTimeUtil.getYear(this.currentDate) + defaultMaxYearOffset,
      this.dateTimeUtil.getMonth(this.currentDate),
      this.dateTimeUtil.getDate(this.currentDate));
    
    this.value = this.value || this.dateTimeUtil.clone(this.currentDate);
  }
  
  ngOnChanges() {
    if (this.minYear && this.maxYear) {
      this.initYears();
      if (this.dateTimeUtil.getYear(this.minYear) > this.dateTimeUtil.getYear(this.maxYear)) {
        throw new Error('minYear could not be larger than maxYear');
      }
    }
  }
  
  initYears() {
    const minYear: number = this.dateTimeUtil.getYear(this.minYear);
    const maxYear: number = this.dateTimeUtil.getYear(this.maxYear);
    
    this.years = [...Array(maxYear - minYear).map(year => minYear + year)];
  }
  
  onChange: any = () => { };
  onTouched: any = () => { };
  
  get value() {
    return this._value;
  }
  
  set value(val: D) {
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
