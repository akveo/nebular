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

export interface NbCalendarCell<D, T> {
  date: D;
  select: EventEmitter<D>;
  selectedValue?: T;
  visibleDate?: D;
  min?: D;
  max?: D;
  filter?: (D) => boolean;
}
