import { TestBed } from '@angular/core/testing';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/native-date-time-util.service';
import { NbCalendarDatePipe } from './calendar-date.pipe';

describe('Pipe: NbCalendarDate', () => {
  let pipe: NbCalendarDatePipe<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
    });
    const dateTimeUtil = TestBed.get(NbDateTimeUtil);
    pipe = new NbCalendarDatePipe(dateTimeUtil);
  });

  it('should render month-year when date is correct object', () => {
    expect(pipe.transform(new Date(2018, 6, 23))).toBe('Jul 2018');
    expect(pipe.transform(new Date(2011, 7, 23))).toBe('Aug 2011');
    expect(pipe.transform(new Date(1018, 3, 23))).toBe('Apr 1018');
    expect(pipe.transform(new Date(2345, 9, 23))).toBe('Oct 2345');
  });

  it('should render empty string when date is null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
