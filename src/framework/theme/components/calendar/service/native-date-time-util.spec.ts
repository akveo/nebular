import { async, inject, TestBed } from '@angular/core/testing';

import { NbNativeDateTimeUtilService } from './native-date-time-util.service';
import { range } from '@nebular/theme/components/calendar/helpers';

let dateTimeUtil: NbNativeDateTimeUtilService;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('native-date-time-util-service', () => {
  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [NbNativeDateTimeUtilService],
    })
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbNativeDateTimeUtilService],
    (_nativeDateTimeUtilService) => {
      dateTimeUtil = _nativeDateTimeUtilService
    },
  )));

  it('should get number of days in month', () => {
    expect(dateTimeUtil.getNumberOfDaysInMonth(new Date(2018, 1, 10))).toBe(28);
    expect(dateTimeUtil.getNumberOfDaysInMonth(new Date(2018, 0, 10))).toBe(31);
  });

  it('should get number of days in month in leap year', () => {
    expect(dateTimeUtil.getNumberOfDaysInMonth(new Date(2016, 1, 10))).toBe(29);
  });

  it('should get start of week day', () => {
    expect(dateTimeUtil.getStartOfWeekDay()).toBe(1);
  });

  it('should get date', () => {
    expect(dateTimeUtil.getDate(new Date(2018, 7, 16))).toBe(16);
  });

  it('should get month', () => {
    expect(dateTimeUtil.getMonth(new Date(2018, 7, 16))).toBe(7);
  });

  it('should get month name', () => {
    range(12).forEach(i => {
      expect(dateTimeUtil.getMonthName(new Date(2018, i, 1))).toBe(MONTH_NAMES[i]);
    });
  });

  it('should get month name by index', () => {
    range(12).forEach(i => {
      expect(dateTimeUtil.getMonthName(new Date(2018, i, 1))).toBe(MONTH_NAMES[i]);
    });
  });

  it('should get year', () => {
    expect(dateTimeUtil.getYear(new Date(2018, 7, 16))).toBe(2018);
  });

  it('should get day of week', () => {
    expect(dateTimeUtil.getDayOfWeek(new Date(2018, 6, 16))).toBe(1);
    expect(dateTimeUtil.getDayOfWeek(new Date(2018, 6, 15))).toBe(0);
  });

  it('should add day', () => {
    const newDate = dateTimeUtil.add(new Date(2018, 6, 16), 1, 'd');
    expect(newDate.getTime()).toBe(new Date(2018, 6, 17).getTime());
  });

  it('should add day in the end of the year', () => {
    const newDate = dateTimeUtil.add(new Date(2018, 11, 31), 1, 'd');
    expect(newDate.getTime()).toBe(new Date(2019, 0, 1).getTime());
  });

  it('should add day in the leap year', () => {
    const newDate = dateTimeUtil.add(new Date(2016, 1, 29), 1, 'd');
    expect(newDate.getTime()).toBe(new Date(2016, 2, 1).getTime());
  });

  it('should add month', () => {
    const newDate = dateTimeUtil.add(new Date(2018, 6, 16), 1, 'm');
    expect(newDate.getTime()).toBe(new Date(2018, 7, 16).getTime());
  });

  it('should add month in the end of the year', () => {
    const newDate = dateTimeUtil.add(new Date(2018, 11, 16), 1, 'm');
    expect(newDate.getTime()).toBe(new Date(2019, 0, 16).getTime());
  });

  it('should add year', () => {
    const newDate = dateTimeUtil.add(new Date(2018, 11, 16), 1, 'y');
    expect(newDate.getTime()).toBe(new Date(2019, 11, 16).getTime());
  });

  it('should create date', () => {
    const date = dateTimeUtil.createDate(2018, 6, 16);
    expect(date.getTime()).toBe(new Date(2018, 6, 16).getTime());
  });

  it('should create now date', () => {
    const now = new Date();
    spyOn(global, 'Date').and.callFake(() => now);
    expect(dateTimeUtil.createNowDate().getTime()).toBe(now.getTime());
  });

  it('should clone', () => {
    const date = new Date(2018, 6, 16);
    expect(dateTimeUtil.clone(date).getTime()).toBe(date.getTime());
  });

  it('should get month start', () => {
    const date = dateTimeUtil.getMonthStart(new Date(2018, 6, 16));
    expect(date.getTime()).toBe(new Date(2018, 6, 1).getTime());
  });

  it('should get week start', () => {
    const date = dateTimeUtil.getWeekStart(new Date(2018, 6, 20));
    expect(date.getTime()).toBe(new Date(2018, 6, 16).getTime());
  });

  it('should get week start diff', () => {
    expect(dateTimeUtil.getWeekStartDiff(new Date(2018, 6, 20))).toBe(4);
  });

  it('should compare years correctly', () => {
    expect(dateTimeUtil.isSameYear(new Date(2018, 0), new Date(2018, 6))).toBeTruthy();
    expect(dateTimeUtil.isSameYear(new Date(2018, 0), new Date(666, 6))).toBeFalsy();
  });

  it('should compare months correctly', () => {
    expect(dateTimeUtil.isSameMonth(new Date(2018, 6), new Date(2018, 6))).toBeTruthy();
    expect(dateTimeUtil.isSameMonth(new Date(2018, 0), new Date(2018, 6))).toBeFalsy();
  });

  it('should compare days correctly', () => {
    expect(dateTimeUtil.isSameDay(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBeTruthy();
    expect(dateTimeUtil.isSameDay(new Date(2018, 7, 16), new Date(2018, 6, 16))).toBeFalsy();
  });

  it('should compare dates correctly', () => {
    expect(dateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2017, 2, 14))).toBeGreaterThan(0);
    expect(dateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2019, 2, 14))).toBeLessThan(0);
    expect(dateTimeUtil.compareDates(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBe(0);
  });
});
