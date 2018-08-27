/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbDateTimeUtil } from './date-time-util';

describe('date-time-util', () => {
  it('should get number of days in month', () => {
    expect(NbDateTimeUtil.getNumberOfDaysInMonth(new Date(2018, 1, 10))).toBe(28);
    expect(NbDateTimeUtil.getNumberOfDaysInMonth(new Date(2018, 0, 10))).toBe(31);
  });

  it('should get number of days in month in leap year', () => {
    expect(NbDateTimeUtil.getNumberOfDaysInMonth(new Date(2016, 1, 10))).toBe(29);
  });

  it('should add day', () => {
    const newDate = NbDateTimeUtil.addDay(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 6, 17).getTime());
  });

  it('should add day in the end of the year', () => {
    const newDate = NbDateTimeUtil.addDay(new Date(2018, 11, 31), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 1).getTime());
  });

  it('should add day in the leap year', () => {
    const newDate = NbDateTimeUtil.addDay(new Date(2016, 1, 29), 1);
    expect(newDate.getTime()).toBe(new Date(2016, 2, 1).getTime());
  });

  it('should add month', () => {
    const newDate = NbDateTimeUtil.addMonth(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 7, 16).getTime());
  });

  it('should add month in the end of the year', () => {
    const newDate = NbDateTimeUtil.addMonth(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 16).getTime());
  });

  it('should add year', () => {
    const newDate = NbDateTimeUtil.addYear(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 11, 16).getTime());
  });

  it('should create date', () => {
    const date = NbDateTimeUtil.createDate(2018, 6, 16);
    expect(date.getTime()).toBe(new Date(2018, 6, 16).getTime());
  });

  it('should clone', () => {
    const date = new Date(2018, 6, 16);
    expect(NbDateTimeUtil.clone(date).getTime()).toBe(date.getTime());
  });

  it('should get month start', () => {
    const date = NbDateTimeUtil.getMonthStart(new Date(2018, 6, 16));
    expect(date.getTime()).toBe(new Date(2018, 6, 1).getTime());
  });

  it('should compare years correctly', () => {
    expect(NbDateTimeUtil.isSameYear(new Date(2018, 0), new Date(2018, 6))).toBeTruthy();
    expect(NbDateTimeUtil.isSameYear(new Date(2018, 0), new Date(666, 6))).toBeFalsy();
  });

  it('should compare months correctly', () => {
    expect(NbDateTimeUtil.isSameMonth(new Date(2018, 6), new Date(2018, 6))).toBeTruthy();
    expect(NbDateTimeUtil.isSameMonth(new Date(2018, 0), new Date(2018, 6))).toBeFalsy();
  });

  it('should compare days correctly', () => {
    expect(NbDateTimeUtil.isSameDay(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBeTruthy();
    expect(NbDateTimeUtil.isSameDay(new Date(2018, 7, 16), new Date(2018, 6, 16))).toBeFalsy();
  });

  it('should compare dates correctly', () => {
    expect(NbDateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2017, 2, 14))).toBeGreaterThan(0);
    expect(NbDateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2019, 2, 14))).toBeLessThan(0);
    expect(NbDateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBe(0);
  });
});
