/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-timepicker-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card size="large">
      <nb-card-body class="example-items-col">
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formpicker">
        <nb-date-timepicker
          [isTwelveHoursFormat]="false"
          [withSeconds]="true"
          [useFullTimeFormat]="true"
          [step]="40"
          #formpicker></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
})
export class DateTimepickerShowcaseComponent {
}
