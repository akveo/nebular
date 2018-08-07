/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { NbLocaleService } from '../../services';


@Pipe({ name: 'nbCalendarDate' })
export class NbCalendarDatePipe implements PipeTransform {

  constructor(private locale: NbLocaleService) {
  }

  transform(date: Date): string {
    return date ? `${this.locale.getMonthName(date)} ${date.getFullYear()}` : '';
  }
}
