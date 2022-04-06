/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'npg-date-timepicker-with-initial-value-showcase',
  template: `
    <nb-card size="large">
      <nb-card-body>
        <input nbInput placeholder="Pick Date" [nbDatepicker]="dateTimePicker" [formControl]="control" />
        <nb-date-timepicker withSeconds #dateTimePicker></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./datepicker-example.scss'],
})
export class DateTimepickerWithInitialValueShowcaseComponent {
  control = new FormControl(new Date());
}
