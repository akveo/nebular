/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

export const NB_TIME_PICKER_CONFIG = new InjectionToken('NB_TIME_PICKER_CONFIG');

export interface NbTimePickerConfig {
  isTwelveHoursFormat?: boolean,
  format?: string,
}

export interface NbSelectedTimeModel {
  value: string;
}

export interface NbSelectedTimePayload<D> {
  time: D,
  save?: boolean,
}

export interface TimeOptions {
  value: number,
  text: string,
}
