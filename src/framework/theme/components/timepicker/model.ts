/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

export const NB_TIME_PICKER_CONFIG = new InjectionToken('NB_TIME_PICKER_CONFIG');

export const NB_TIME_PICKER_LOCALIZATION = new InjectionToken<NbTimepickerLocalization>('NB_TIME_PICKER_LOCALIZATION', {
  providedIn: 'root',
  factory: () => {
    return {
      hoursText: 'Hr', minutesText: 'Min', secondsText: 'Sec', ampmText: 'Am/Pm',
    }
  },
});

export interface NbTimePickerConfig {
  twelveHoursFormat?: boolean,
  format?: string,
}

export interface NbSelectedTimeModel {
  value: string;
}

export interface NbSelectedTimePayload<D> {
  time: D,
  save?: boolean,
}

export interface NbTimepickerLocalization {
  hoursText: string,
  minutesText: string,
  secondsText: string,
  ampmText: string,
}
