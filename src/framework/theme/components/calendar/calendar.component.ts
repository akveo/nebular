/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnInit } from '@angular/core';
import { NbDateTimeUtil } from './service/date-time-util.interface';
import { ControlValueAccessor } from '@angular/forms';

/**
 */
@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
})
export class NbCalendarComponent<D> implements ControlValueAccessor, OnInit {

  @Input('value') _value: D = null;

  activeMonth: D;

  currentDate: D;

  boundingMonths: boolean = false;

  constructor(
    private dateTimeUtil: NbDateTimeUtil<D>,
  ) {
    this.value = this.dateTimeUtil.createDate(2018, 5, 1);
  }

  ngOnInit() {
    this.currentDate = this.dateTimeUtil.createNowDate();
    this.activeMonth = this.dateTimeUtil.getMonthStart(this.value || this.currentDate);
  }

  prevMonth() {
    this.activeMonth = this.dateTimeUtil.add(this.activeMonth, -1, 'm');
  }

  nextMonth() {
    this.activeMonth = this.dateTimeUtil.add(this.activeMonth, 1, 'm');
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
