import { async, inject, TestBed } from '@angular/core/testing';
import { NbLocaleService } from './locale';
import { range } from '../helpers';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('native-locale-adapter', () => {
  let localeAdapter: NbLocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbLocaleService],
    })
  });

  beforeEach(async(inject(
    [NbLocaleService],
    (_localeAdapter) => {
      localeAdapter = _localeAdapter
    },
  )));

  it('should get start of week day', () => {
    expect(localeAdapter.getFirstDayOfWeek()).toBe(1);
  });

  it('should get month name', () => {
    range(12).forEach(i => {
      expect(localeAdapter.getMonthName(new Date(2018, i, 1))).toBe(MONTH_NAMES[i]);
    });
  });

  it('should get month name by index', () => {
    range(12).forEach(i => {
      expect(localeAdapter.getMonthNameByIndex(i)).toBe(MONTH_NAMES[i]);
    });
  });

  it('should get week start diff', () => {
    expect(localeAdapter.getWeekStartDiff(new Date(2018, 6, 20))).toBe(4);
  });
});
