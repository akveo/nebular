/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';

import { NB_DATE_SERVICE_OPTIONS, NbNativeDateService } from '@nebular/theme';

import * as dateFnsParse from 'date-fns/parse';
// @ts-ignore
import { default as rollupParse } from 'date-fns/parse';
import * as dateFnsFormat from 'date-fns/format';
// @ts-ignore
import { default as rollupFormat } from 'date-fns/format';
import * as dateFnsGetWeek from 'date-fns/getWeek';
// @ts-ignore
import { default as rollupGetWeek } from 'date-fns/getWeek';

const parse = rollupParse || dateFnsParse;
const formatDate = rollupFormat || dateFnsFormat;
const getWeek = rollupGetWeek || dateFnsGetWeek;

export interface NbDateFnsOptions {
  format: string;
  parseOptions: {},
  formatOptions: {},
  getWeekOptions: {},
}

@Injectable()
export class NbDateFnsDateService extends NbNativeDateService {
  protected options: Partial<NbDateFnsOptions>;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) options,
  ) {
    super(locale);
    this.setLocale(locale);
    this.options = options || {};
  }

  format(date: Date, format: string): string {
    if (date) {
      return formatDate(date, format || this.options.format, this.options.formatOptions);
    }

    return '';
  }

  parse(date: string, format: string): Date {
    return parse(date, format || this.options.format, new Date(), this.options.parseOptions);
  }

  getId(): string {
    return 'date-fns';
  }

  getWeekNumber(date: Date): number {
    return getWeek(date, this.options.getWeekOptions);
  }
}
