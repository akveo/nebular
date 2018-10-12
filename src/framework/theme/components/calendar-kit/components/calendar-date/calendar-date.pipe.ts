/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { NbDateService } from '../../services';


@Pipe({ name: 'nbCalendarDate' })
export class NbCalendarDatePipe<D> implements PipeTransform {

  constructor(protected dateService: NbDateService<D>) {
  }

  transform(date: D, dateFormat: 'short' | 'full' = 'short'): string {
    if (dateFormat === 'short') {
      return date ? `${this.dateService.getMonthName(date)} ${this.dateService.getYear(date)}` : '';
    }
    return date ?
      `${this.dateService.getMonthName(date)} ${this.dateService.getDate(date)} ${this.dateService.getYear(date)}` : '';
  }
}
