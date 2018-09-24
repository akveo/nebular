/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { NbNativeDateService } from '@nebular/theme';

import * as parse from 'date-fns/parse';


@Injectable()
export class NbDateFnsDateService extends NbNativeDateService {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
    this.setLocale(locale);
  }

  parse(date: string, format: string): Date {
    return parse(date, format, new Date());
  }
}
