/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

import { NbDateService } from '@nebular/theme';

import { NbDateFnsDateService } from './date-fns-date.service';

describe('date-fns-date-service', () => {
  let dateService: NbDateService<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dateService = new NbDateFnsDateService(TestBed.inject(LOCALE_ID), null);
  });

  it('should parse date according to the MM.dd.yyyy format', () => {
    const date = '06.15.2018';
    expect(dateService.parse(date, 'MM.dd.yyyy')).toEqual(new Date(2018, 5, 15));
  });

  it('should not format if date isn\'t passed', () => {
    expect(() => dateService.format(undefined, 'DD.MM.YYYY')).not.toThrow();
    expect(dateService.format(undefined, 'DD.MM.YYYY')).toEqual('');
  });

  describe('service global config', () => {
    const SEPARATOR = '_';
    const FORMAT = `MM${SEPARATOR}dd${SEPARATOR}yyyy`;
    const year = 2010;
    const monthIndex = 10;
    const month = monthIndex + 1;
    const day = 20;
    const date = new Date(year, monthIndex, day);
    const formattedDate = `${month}${SEPARATOR}${day}${SEPARATOR}${year}`;

    beforeEach(() => {
      dateService = new NbDateFnsDateService(
        TestBed.inject(LOCALE_ID),
        {
          format: FORMAT,
          parseOptions: {
            useAdditionalWeekYearTokens: true,
            useAdditionalDayOfYearTokens: true,
          },
          formatOptions: {
            useAdditionalWeekYearTokens: true,
            useAdditionalDayOfYearTokens: true,
          },
        },
      );
    });

    it('should use format from global config if isn\'t passed as parameter', () => {
      expect(dateService.format(date, undefined)).toEqual(formattedDate);

      const parsedDate = dateService.parse(formattedDate, FORMAT);
      expect(parsedDate.valueOf()).toEqual(date.valueOf());
    });

    it('should use parameter over global config format if presented', () => {
      expect(dateService.format(date, undefined)).toEqual(formattedDate);

      const parsedDate = dateService.parse(formattedDate, FORMAT);
      expect(parsedDate.valueOf()).toEqual(date.valueOf());
    });

    it('should pass parseOptions to parse function', () => {
      // date-fns require { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true } options
      // to be passed to parse function
      // when format contains 'DD' or 'YYYY' tokens, otherwise it throws. This option is
      // passed as global config to service constructor so it shouldn't throw.
      expect(() => dateService.parse(formattedDate, 'DD/MM/YYYY')).not.toThrow();
    });

    it('should pass formatOptions to format function', () => {
      // date-fns require { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true } options
      // to be passed to format function
      // when format contains 'DD' or 'YYYY' tokens, otherwise it throws. This option is
      // passed as global config to service constructor so it shouldn't throw.
      expect(() => dateService.format(date, 'DD/MM/YYYY')).not.toThrow();
    });
  });
});
