/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

export const NB_TIME_PICKER_CONFIG = new InjectionToken('NB_TIME_PICKER_CONFIG');

export interface NbTimepickerLocalizationConfig {
  hoursText: string,
  minutesText: string,
  secondsText: string,
  ampmText: string,
  timeText: string;
  applyButtonText: string,
  currentTimeButtonText: string,
}

export const NB_DEFAULT_TIMEPICKER_LOCALIZATION_CONFIG: NbTimepickerLocalizationConfig = {
  hoursText: 'Hr',
  minutesText: 'Min',
  secondsText: 'Sec',
  ampmText: 'Am/Pm',
  timeText: 'Time',
  applyButtonText: 'ok',
  currentTimeButtonText: 'now',
};

export interface NbTimePickerConfig {
  twelveHoursFormat?: boolean,
  format?: string,
  localization?: Partial<NbTimepickerLocalizationConfig>,
}

export interface NbSelectedTimeModel {
  value: string;
}

export interface NbSelectedTimePayload<D> {
  time: D,
  save?: boolean,
}
