/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { NbCalendarMonthModelService } from './calendar-month-model.service';
import { NbLocaleService } from '@nebular/theme';


describe('month-model-service', () => {
  let monthModel: NbCalendarMonthModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbLocaleService, NbCalendarMonthModelService],
    });
  });

  beforeEach(async(inject(
    [NbCalendarMonthModelService],
    (_monthModel) => {
      monthModel = _monthModel;
    },
  )));

  it('should create days grid with active month', () => {
    const date = new Date(2018, 7, 1);
    const grid: Date[][] = monthModel.createDaysGrid(date);
    expect(grid.length).toBe(5);
    grid.forEach((row: Date[]) => {
      expect(row.length).toBe(7);
    });
  });

  it('should create days grid without boundingMonth', () => {
    const date = new Date(2018, 7, 1);
    const grid: Date[][] = monthModel.createDaysGrid(date, false);
    const firstTwoEmpty = grid.shift().slice(0, 3);
    const lastTwoEmpty = grid.pop().slice(6);
    firstTwoEmpty.forEach(cell => {
      expect(cell).toBeNull();
    });
    lastTwoEmpty.forEach(cell => {
      expect(cell).toBeNull();
    });
  });
});
