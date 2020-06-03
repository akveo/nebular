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
  SEC = 'sec',
  AMPM = 'ampm',
}
export const NB_TIME_PICKER_CONFIG = new InjectionToken('CONFIG');

export interface NbTimePickerConfig {
  isTwelveHoursFormat?: boolean,
}

export interface NbSelectedTimeModel {
  hour?: string;
  minute?: string;
  sec?: string;
  ampm?: string;
  fullTime?: string;
}

export interface NbSelectedTimePayload {
  time: NbSelectedTimeModel,
  twelveHourFormat: boolean,
  format?: string,
  save?: boolean,
}
