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
    dateService = new NbDateFnsDateService(TestBed.get(LOCALE_ID));
  });

  it('should parse date according to the MM.dd.yyyy format', () => {
    const date = '06.15.2018';
    expect(dateService.parse(date, 'MM.dd.yyyy')).toEqual(new Date(2018, 5, 15));
  });
});
