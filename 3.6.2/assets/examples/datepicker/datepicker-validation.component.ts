/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';


@Component({
  selector: 'nb-datepicker-validation',
  template: `
    <nb-card size="large">
      <nb-card-body>
        <input nbInput placeholder="Pick Date" [nbDatepicker]="picker">
        <nb-datepicker #picker [min]="min" [max]="max"></nb-datepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./datepicker-example.scss'],
})
export class DatepickerValidationComponent {
  min: Date;
  max: Date;

  constructor(protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addMonth(this.dateService.today(), -1);
    this.max = this.dateService.addMonth(this.dateService.today(), 1);
  }
}
