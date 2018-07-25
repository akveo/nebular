import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { NbLocaleAdapter } from './locale-adapter';
import { NbDateTimeUtil } from './date-time-util';

/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
  'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

/** The default month names to use if Intl API is not available. */
const DEFAULT_MONTH_NAMES = {
  'long': [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ],
  'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
};

@Injectable()
export class NbNativeLocaleAdapter extends NbLocaleAdapter<Date> {
  protected locale: string;

  constructor(@Inject(LOCALE_ID) locale: string, protected dateUtil: NbDateTimeUtil) {
    super();
    this.locale = locale;
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  getStartOfWeek(): number {
    return 1;
  }

  /* returns month name */
  getMonthName(date: Date): string {
    const index: number = this.dateUtil.getMonth(date);
    return this.getMonthNameByIndex(index);
  }

  getMonthNameByIndex(index: number): string {
    return DEFAULT_MONTH_NAMES['narrow'][index];
  }

  getMonthNames(): string[] {
    return DEFAULT_MONTH_NAMES['narrow'];
  }

  getDayOfWeekNames(): string[] {
    return DEFAULT_DAY_OF_WEEK_NAMES['narrow'];
  }
}
