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
    <div>
      <input nbInput placeholder="Form Picker" [nbDatepicker]="picker">
      <nb-datepicker #picker [min]="min" [max]="max"></nb-datepicker>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-content: center;
      height: 40rem;
    }

    :host input {
      width: 21.875rem;
    }
  `],
})
export class NbDatepickerValidationComponent {
  min: Date;
  max: Date;

  constructor(protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addMonth(this.dateService.today(), -1);
    this.max = this.dateService.addMonth(this.dateService.today(), 1);
  }
}
