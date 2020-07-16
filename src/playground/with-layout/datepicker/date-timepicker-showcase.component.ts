/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-date-timepicker-showcase',
  template: `
    <nb-card size="large">
      <nb-card-body>
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formpicker">
        <nb-date-timepicker
          [title]="'Title'"
          [withSeconds]="true"
          [isTwelveHoursFormat]="false"
          #formpicker></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./datepicker-example.scss'],
})
export class DateTimepickerShowcaseComponent {
}
