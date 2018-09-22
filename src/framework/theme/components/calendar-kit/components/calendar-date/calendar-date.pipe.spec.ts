/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

import { NbCalendarDatePipe } from './calendar-date.pipe';
import { NbDateService, NbNativeDateService } from '../../services';


describe('Pipe: NbCalendarDate', () => {
  let pipe: NbCalendarDatePipe<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
    });
    const dateService = TestBed.get(NbDateService);
    pipe = new NbCalendarDatePipe(dateService);
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
