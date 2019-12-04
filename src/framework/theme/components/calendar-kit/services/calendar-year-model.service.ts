/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { range, batch } from '../helpers';
import { NbDateService } from './date.service';

@Injectable()
export class NbCalendarYearModelService<D> {

  protected yearsInView = 12;
  protected yearsInRow = 4;

  constructor(protected dateService: NbDateService<D>) {
  }

  getYearsInView(): number {
    return this.yearsInView;
  }

  getRowInView(): number {
    return this.yearsInRow;
  }

  getViewYears(viewYear: D): D[][] {
    const year = this.dateService.getYear(viewYear);
    const viewStartYear = year - (year % this.yearsInView);
    const years = range(this.yearsInView).map(i => this.copyWithYear(viewStartYear + i, viewYear));

    return batch(years, this.getRowInView());
  }

  protected copyWithYear(year: number, date: D): D {
    return this.dateService.createDate(year, this.dateService.getMonth(date), this.dateService.getDate(date));
  }
}
