/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { NbNativeDateService } from '@nebular/theme';

import * as dateFnsParse from 'date-fns/parse';
// @ts-ignore
import { default as rollupParse} from 'date-fns/parse';

const parse = rollupParse || dateFnsParse;


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
