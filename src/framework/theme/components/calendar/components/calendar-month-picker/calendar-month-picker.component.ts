/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util.interface';
import { NbArrayHelper } from '../../helpers/array.helper';

/**
 */
@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  templateUrl: './calendar-month-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCalendarMonthPickerComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent<D> implements ControlValueAccessor, OnInit {
  
  @Input('value')
  _value: D;
  
  @Input()
  selectedValue: D;
  
  @Input()
  public currentDate: D;
  
  months: any[];
  
  @Output()
  change = new EventEmitter<any>();

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>,
              private dateTimeUtil: NbDateTimeUtil<D>,
              private arrayHelper: NbArrayHelper) {}

  ngOnInit() {
    this.currentDate = this.currentDate || this.dateTimeUtil.createNowDate();
    this.value = this.value || this.dateTimeUtil.clone(this.currentDate);
    this.initMonths();
  }
  
  initMonths() {
    const selectedMonth = this.dateTimeUtil.getMonth(this.selectedValue);
    
    const months = Array.from(Array(12).keys())
      .map(index => ({
        value: index,
        label: this.dateTimeUtil.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));
    
    this.months = this.arrayHelper.splitToChunks(months, 4);
  }
  
  onMonthSelect(month) {
    this.value = this.dateTimeUtil.createDate(
      this.dateTimeUtil.getYear(this.selectedValue),
      month,
      this.dateTimeUtil.getDate(this.selectedValue),
    );
    this.change.emit(this.value);
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
