import { TestBed } from '@angular/core/testing';
import {
  NbCalendarRange,
  NbDateService,
  NbDateTimeAdapterService,
  NbDateAdapterService,
  NbRangeAdapterService,
} from '@nebular/theme';

describe('Date Adapters', () => {
  beforeEach(() => {
    const mockDateService = {
      parse() {},
      format() {},
      isValidDateString() {},
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: NbDateService, useValue: mockDateService },
        NbDateAdapterService,
        NbRangeAdapterService,
        NbDateTimeAdapterService,
      ],
    });
  });

  describe('NbDateAdapterService', () => {
    let dateService: NbDateService<Date>;
    let adapterService: NbDateAdapterService<Date>;
    beforeEach(() => {
      adapterService = TestBed.inject(NbDateAdapterService);
      dateService = TestBed.inject(NbDateService);
    });

    it('should be created', () => {
      expect(adapterService).toBeTruthy();
    });

    it('should use date service to parse date', () => {
      const date = '11/11/11';
      const format = 'mm/dd/yy';
      const parsed = new Date();
      const spy = spyOn(dateService, 'parse').and.returnValue(parsed);

      expect(adapterService.parse(date, format)).toEqual(parsed);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(date, format);
    });

    it('should use date service to format date', () => {
      const date = new Date();
      const format = 'mm/dd/yyyy';
      const formatted = 'formatted';
      const spy = spyOn(dateService, 'format').and.returnValue(formatted);

      expect(adapterService.format(date, format)).toEqual(formatted);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(date, format);
    });

    it('should use date service to validate date string', () => {
      const date = '11/11/11';
      const format = 'mm/dd/yy';
      const results = [true, false];
      const spy = spyOn(dateService, 'isValidDateString').and.returnValues(...results);

      for (let i = 0, callsCount = 0; i < results.length; i++) {
        expect(adapterService.isValid(date, format)).toEqual(results[i]);
        callsCount++;
        expect(spy).toHaveBeenCalledTimes(callsCount);
        expect(spy).toHaveBeenCalledWith(date, format);
      }
    });
  });

  describe('NbRangeAdapterService', () => {
    let dateService: NbDateService<Date>;
    let adapterService: NbRangeAdapterService<Date>;
    beforeEach(() => {
      dateService = TestBed.inject(NbDateService);
      adapterService = TestBed.inject(NbRangeAdapterService);
    });

    it('should be created', () => {
      expect(adapterService).toBeTruthy();
    });

    it('should use date service to parse date', () => {
      const startDate = '11/11/11';
      const endDate = '12/11/11';
      const date = `${startDate}-${endDate}`;
      const format = 'mm/dd/yy';
      const expectedStart = new Date();
      const expectedEnd = new Date();
      const spy = spyOn(dateService, 'parse').and.returnValues(expectedStart, expectedEnd);

      const { start: actualStart, end: actualEnd }: NbCalendarRange<Date> = adapterService.parse(date, format);
      expect(actualStart).toEqual(expectedStart);
      expect(actualEnd).toEqual(expectedEnd);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.calls.argsFor(0)).toEqual([startDate, format]);
      expect(spy.calls.argsFor(1)).toEqual([endDate, format]);
    });

    it('should format valid date range', () => {
      const range: NbCalendarRange<Date> = { start: new Date(), end: new Date() };
      const format = 'mm/dd/yyyy';
      const spy = spyOn(dateService, 'isValidDateString').and.returnValues(true, true);

      expect(adapterService.format(range, format)).toEqual('undefined - undefined');
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("should not format if range isn't passed", () => {
      const spy = spyOn(dateService, 'isValidDateString').and.returnValues(false, false);

      expect(adapterService.format(null, '')).toEqual('');
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not format if start date is invalid', () => {
      const range: NbCalendarRange<Date> = { start: new Date(), end: new Date() };
      const spy = spyOn(dateService, 'isValidDateString').and.returnValue(false);

      expect(adapterService.format(range, '')).toEqual('');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return only start date if end is invalid', () => {
      const range: NbCalendarRange<Date> = { start: new Date(), end: new Date() };
      const spy = spyOn(dateService, 'isValidDateString').and.returnValues(true, false);

      expect(adapterService.format(range, '')).toEqual(undefined);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should use date service to validate date string', () => {
      const startDate = '11/11/11';
      const endDate = '12/11/11';
      const date = `${startDate}-${endDate}`;
      const format = 'mm/dd/yy';
      const results = [true, false, true, true];
      const spy = spyOn(dateService, 'isValidDateString').and.returnValues(...results);

      for (let i = 0, callsCount = 0; i < results.length - 1; i += 2) {
        expect(adapterService.isValid(date, format)).toEqual(results[i] && results[i + 1]);
        callsCount += 2;

        expect(spy).toHaveBeenCalledTimes(callsCount);
        expect(spy.calls.argsFor(i)).toEqual([startDate, format]);
        expect(spy.calls.argsFor(i + 1)).toEqual([endDate, format]);
      }
    });
  });

  describe('NbDateTimeAdapterService', () => {
    let dateService: NbDateService<Date>;
    let adapterService: NbDateTimeAdapterService<Date>;
    beforeEach(() => {
      dateService = TestBed.inject(NbDateService);
      adapterService = TestBed.inject(NbDateTimeAdapterService);
    });

    it('should be created', () => {
      expect(adapterService).toBeTruthy();
    });

    it('should use date service to parse date', () => {
      const date = '24/03/93 20:30:24';
      const format = 'mm/dd/yy HH:mm:ss';
      const parsed = new Date();
      const spy = spyOn(dateService, 'parse').and.returnValue(parsed);

      expect(adapterService.parse(date, format)).toEqual(parsed);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(date, format);
    });

    it('should use date service to format date', () => {
      const date = new Date();
      const format = 'mm/dd/yyyy HH:mm:ss';
      const formatted = 'formatted';
      const spy = spyOn(dateService, 'format').and.returnValue(formatted);

      expect(adapterService.format(date, format)).toEqual(formatted);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(date, format);
    });
  });
});
