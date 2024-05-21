/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

import { NbNativeDateService, NbDateService, NbDayPeriod } from '@nebular/theme';

describe('native-date-service', () => {
  let dateService: NbDateService<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dateService = new NbNativeDateService(TestBed.inject(LOCALE_ID));
  });

  it('should set locale to en', () => {
    dateService.setLocale('en');
    expect((<any>dateService).locale).toBe('en');
  });

  it('should set locale to jp', () => {
    dateService.setLocale('jp');
    expect((<any>dateService).locale).toBe('jp');
  });

  it('should validate as correct if date string is valid according to the format', () => {
    const isValid = dateService.isValidDateString('04.23.2018', 'MM.DD.YYYY');
    expect(isValid).toBeTruthy();
  });

  it('should validate as incorrect if date string is invalid according to the format', () => {
    const isValid = dateService.isValidDateString('23.04.2018', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('should validate as incorrect if date string is completely incorrect', () => {
    const isValid = dateService.isValidDateString('hello, it is a date string', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('should validate as correct if time string is valid according to the hours format', () => {
    const isValid = dateService.isValidTimeString('14:23 00', 'HH:mm:ss');
    expect(isValid).toBeTruthy();
  });

  it('should validate as correct if time string is valid according to the twelve hours format',
    () => {
    const isValid = dateService.isValidTimeString('04:23 00 AM', 'hh:mm:ss A');
    expect(isValid).toBeTruthy();
  });

  it('should validate as incorrect if time string is invalid according to the format', () => {
    const isValid = dateService.isValidTimeString('24:23:00 AM', 'hh:mm:ss A');
    expect(isValid).toBeFalsy();
  });

  it('should validate as incorrect if time string is completely incorrect', () => {
    const isValid = dateService.isValidTimeString('hello, it is a time string', 'hh:mm:ss A');
    expect(isValid).toBeFalsy();
  });

  it('should create today date', () => {
    const today = dateService.today();
    expect(dateService.isSameDay(today, new Date())).toBeTruthy();
  });

  it('should get date', () => {
    const date = new Date(2018, 11, 15);
    expect(dateService.getDate(date)).toBe(15);
  });

  it('should get month', () => {
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonth(month)).toBe(5);
  });

  it('should get hour', () => {
    const hour = new Date(2018, 5, 15, 12);

    expect(dateService.getHours(hour)).toBe(12);
  });

  it('should get minute', () => {
    const minute = new Date(2018, 5, 15, 12, 10);
    expect(dateService.getMinutes(minute)).toBe(10);
  });

  it('should get second', () => {
    const second = new Date(2018, 5, 15, 12, 10, 24);
    expect(dateService.getSeconds(second)).toBe(24);
  });

  it('should get second', () => {
    const second = new Date(2018, 5, 15, 12, 10, 24, 22);
    expect(dateService.getMilliseconds(second)).toBe(22);
  });

  it('should get year', () => {
    const year = new Date(2018, 5, 15);
    expect(dateService.getYear(year)).toBe(2018);
  });

  it('should get day of week', () => {
    const date = new Date(2018, 8, 17);
    expect(dateService.getDayOfWeek(date)).toBe(1);
  });

  it('should get first day of week', () => {
    expect(dateService.getFirstDayOfWeek()).toBe(0);
  });

  it('should get month name', () => {
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonthName(month)).toBe('Jun');
  });

  it('should get month name by index', () => {
    expect(dateService.getMonthNameByIndex(5)).toBe('Jun');
  });

  it('should get day of week names', () => {
    expect(dateService.getDayOfWeekNames()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
  });

  it('should format date according to the MM.dd.yyyy format', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.format(date, 'MM.dd.yyyy')).toBe('06.15.2018');
  });

  it('should parse date', () => {
    const date = '06.15.2018';
    expect(dateService.parse(date, '')).toEqual(new Date(2018, 5, 15));
  });

  it('should get year end', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.getYearEnd(date)).toEqual(new Date(2018, 11, 31));
  });

  it('should get year start', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.getYearStart(date)).toEqual(new Date(2018, 0, 1));
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

  it('should add month if number of days will be less than current date', () => {
    const newDate = dateService.addMonth(new Date(2018, 11, 31), -1);
    expect(newDate.getTime()).toBe(new Date(2018, 10, 30).getTime());
  });

  it('should add year', () => {
    const newDate = dateService.addYear(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 11, 16).getTime());
  });

  it('should set hour', () => {
    const newDate = dateService.setHours(new Date(), 12);
    expect(newDate.getHours()).toEqual(12);
  });

  it('should set minute', () => {
    const newDate = dateService.setMinutes(new Date(), 30);
    expect(newDate.getMinutes()).toEqual(30);
  });

  it('should set seconds', () => {
    const newDate = dateService.setSeconds(new Date(), 30);
    expect(newDate.getSeconds()).toEqual(30);
  });

  it('should add hour', () => {
    const newDate = dateService.addHours(new Date(2020, 3, 24, 8), 1);
    expect(newDate.getHours()).toEqual(9);
  });

  it('should add minute', () => {
    const newDate = dateService.addMinutes(new Date(2020, 3, 24, 8, 40), 20);
    expect(newDate.getHours()).toEqual(9);
    expect(newDate.getMinutes()).toEqual(0);
  });

  it('should create date', () => {
    const date = dateService.createDate(2018, 6, 16);
    expect(date).toEqual(new Date(2018, 6, 16));
  });

  it('should create date for two digit year', () => {
    const date = dateService.createDate(12, 6, 16);
    expect(dateService.getYear(date)).toBe(12);
    expect(dateService.getMonth(date)).toBe(6);
    expect(dateService.getDate(date)).toBe(16);
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

  it('should return correct day period', () => {
    const date = new Date(2018, 7, 1, 12);

    expect(dateService.getDayPeriod(date)).toEqual(NbDayPeriod.PM);

    date.setHours(14);
    expect(dateService.getDayPeriod(date)).toEqual(NbDayPeriod.PM);

    date.setHours(11);
    expect(dateService.getDayPeriod(date)).toEqual(NbDayPeriod.AM);

    date.setHours(0);
    expect(dateService.getDayPeriod(date)).toEqual(NbDayPeriod.AM);
  });
});
