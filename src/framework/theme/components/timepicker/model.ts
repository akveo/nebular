/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

export const enum NbTimepickerTypes {
  FULL_TIME = 'fullTime',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  AMPM = 'ampm',
}
export const NB_TIME_PICKER_CONFIG = new InjectionToken('NB_TIME_PICKER_CONFIG');

export interface NbTimePickerConfig {
  isTwelveHoursFormat?: boolean,
  format?: string,
}

export interface NbSelectedTimeModel {
  value: string;
  type: NbTimepickerTypes;
}

export interface NbSelectedTimePayload<D> {
  time: D,
  twelveHourFormat: boolean,
  format?: string,
  save?: boolean,
}

export interface TimeOptions {
  value: number,
  text: string,
}
