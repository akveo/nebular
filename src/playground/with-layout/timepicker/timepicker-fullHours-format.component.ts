/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-timepicker-full-hours-format',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card size="large">
      <nb-card-body class="example-items-col">
        <input nbInput
               type="text"
               [nbTimepicker]="timepicker"/>
        <nb-timepicker
          #timepicker="nbTimepicker"
          [useFullTimeFormat]="true"
          [step]="10"></nb-timepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./timepicker-example.scss'],
})
export class TimepickerFullHoursFormatComponent {
}
