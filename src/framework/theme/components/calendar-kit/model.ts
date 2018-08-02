/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EventEmitter } from '@angular/core';

export interface NbCalendarDay {
  name: string;
  isHoliday: boolean;
}

export class NbCalendarMonthBuilderContext<T> {
  activeMonth: Date;
  selectedValue: T;
  includeBoundingMonths: boolean;
}

export enum NbCalendarViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
}

export interface NbCalendarCell<T> {
  date: Date;
  select: EventEmitter<Date>;
  selectedValue?: T;
  activeMonth?: Date;
  min?: Date;
  max?: Date;
  filter?: (Date) => boolean;
}
