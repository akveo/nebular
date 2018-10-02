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

  transform(date: D): string {
    return date ? `${this.dateService.getMonthName(date)} ${this.dateService.getYear(date)}` : '';
  }
}
