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
          #formpicker
          [title]="'Title'"
          [useFullTimeFormat]="true"
          [step]="10"></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
})
export class DateTimepickerFullTImeComponent {
}
