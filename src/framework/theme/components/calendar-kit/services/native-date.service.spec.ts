/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbDateService } from './date.service';
import { NbNativeDateService } from '@nebular/theme';
import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';


describe('native-date-service', () => {
  let dateService: NbDateService<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DatePipe] });
    const datePipe = TestBed.get(DatePipe);
    const locale = TestBed.get(LOCALE_ID);
    dateService = new NbNativeDateService(locale, datePipe);
  });

  it('should get number of days in month', () => {
    expect(dateService.getNumberOfDaysInMonth(new Date(2018, 1, 10))).toBe(28);
    expect(dateService.getNumberOfDaysInMonth(new Date(2018, 0, 10))).toBe(31);
  });

  it('should get number of days in month in leap year', () => {
    expect(dateService.getNumberOfDaysInMonth(new Date(2016, 1, 10))).toBe(29);
  });

  it('should add day', () => {
    const newDate = dateService.addDay(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 6, 17).getTime());
  });

  it('should add day in the end of the year', () => {
    const newDate = dateService.addDay(new Date(2018, 11, 31), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 1).getTime());
  });

  it('should add day in the leap year', () => {
    const newDate = dateService.addDay(new Date(2016, 1, 29), 1);
    expect(newDate.getTime()).toBe(new Date(2016, 2, 1).getTime());
  });

  it('should add month', () => {
    const newDate = dateService.addMonth(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 7, 16).getTime());
  });

  it('should add month in the end of the year', () => {
    const newDate = dateService.addMonth(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 16).getTime());
  });

  it('should add year', () => {
    const newDate = dateService.addYear(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 11, 16).getTime());
  });

  it('should create date', () => {
    const date = dateService.createDate(2018, 6, 16);
    expect(date.getTime()).toBe(new Date(2018, 6, 16).getTime());
  });

  it('should clone', () => {
    const date = new Date(2018, 6, 16);
    expect(dateService.clone(date).getTime()).toBe(date.getTime());
  });

  it('should get month start', () => {
    const date = dateService.getMonthStart(new Date(2018, 6, 16));
    expect(date.getTime()).toBe(new Date(2018, 6, 1).getTime());
  });

  it('should compare years correctly', () => {
    expect(dateService.isSameYear(new Date(2018, 0), new Date(2018, 6))).toBeTruthy();
    expect(dateService.isSameYear(new Date(2018, 0), new Date(666, 6))).toBeFalsy();
  });

  it('should compare months correctly', () => {
    expect(dateService.isSameMonth(new Date(2018, 6), new Date(2018, 6))).toBeTruthy();
    expect(dateService.isSameMonth(new Date(2018, 0), new Date(2018, 6))).toBeFalsy();
  });

  it('should compare days correctly', () => {
    expect(dateService.isSameDay(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBeTruthy();
    expect(dateService.isSameDay(new Date(2018, 7, 16), new Date(2018, 6, 16))).toBeFalsy();
  });

  it('should compare dates correctly', () => {
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2017, 2, 14))).toBeGreaterThan(0);
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2019, 2, 14))).toBeLessThan(0);
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBe(0);
  });
});
