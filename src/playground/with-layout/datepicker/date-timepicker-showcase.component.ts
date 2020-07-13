/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-date-timepicker-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card size="large">
      <nb-card-body class="example-items-col">
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formpicker">
        <nb-date-timepicker
          [title]="'Title'"
          [withSeconds]="false"
          [isTwelveHoursFormat]="true"
          [applyButtonText]="'Save'"
          [currentTimeButtonText]="'Set current time'"
          #formpicker></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
})
export class DateTimepickerShowcaseComponent {
}
