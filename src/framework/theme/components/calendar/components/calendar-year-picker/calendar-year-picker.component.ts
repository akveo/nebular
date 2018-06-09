/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbCalendarModelFactoryService } from '../../models/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util.interface';

const defaultStartYear = 2016;
const defaultYearCount = 20;

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
  selectedValue: D;
  
  @Input()
  public startYear: number = defaultStartYear;
  
  @Input()
  public yearCount: number = defaultYearCount;

  @Input()
  public currentDate: D;
  
  @Output()
  change = new EventEmitter<any>();
  
  private years: any[];

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>,
              private dateTimeUtil: NbDateTimeUtil<D>) {}

  ngOnInit() {
    this.currentDate = this.currentDate || this.dateTimeUtil.createNowDate();
    this.value = this.value || this.dateTimeUtil.clone(this.currentDate);
  }
  
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['startYear'] || changes['yearCount']) {
      this.initYears();
    }
  }
  
  initYears() {
    const selectedYear = this.dateTimeUtil.getYear(this.selectedValue);
    
    const years = Array.from(Array(this.yearCount).keys())
      .map(index => ({
        value: this.startYear + index,
        selected: selectedYear === this.startYear + index,
      }));
    
    this.years = this.splitToChunks(years, 4);
  }
  
  splitToChunks(years, chunkSize) {
    return years.reduce((res, item, index) => {
      const chunkIndex = Math.floor(index/chunkSize);
      if (!res[chunkIndex]) {
        res[chunkIndex] = [];
      }
      res[chunkIndex].push(item);
      return res;
    }, [])
  }
  
  onYearSelect(year) {
    this.value = this.dateTimeUtil.createDate(
      year,
      this.dateTimeUtil.getMonth(this.selectedValue),
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
