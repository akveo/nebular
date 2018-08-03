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

export enum NbCalendarViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
}

export enum NbCalendarSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface NbCalendarCell<T> {
  date: Date;
  select: EventEmitter<Date>;
  selectedValue?: T;
  visibleDate?: Date;
  min?: Date;
  max?: Date;
  filter?: (Date) => boolean;
}
