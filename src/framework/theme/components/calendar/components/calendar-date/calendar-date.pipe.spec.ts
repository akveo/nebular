import { TestBed } from '@angular/core/testing';
import { NbCalendarDatePipe } from './calendar-date.pipe';
import { NbLocaleAdapter, NbLocaleService } from '../../service';

describe('Pipe: NbCalendarDate', () => {
  let pipe: NbCalendarDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NbLocaleAdapter, useClass: NbLocaleService }],
    });
    const localeAdapter = TestBed.get(NbLocaleAdapter);
    pipe = new NbCalendarDatePipe(localeAdapter);
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
