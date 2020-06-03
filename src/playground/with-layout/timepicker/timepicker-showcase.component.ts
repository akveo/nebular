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
        <input nbInput
               type="text"
               placeholder="Enter value"
               [nbTimepicker]="timepicker"/>
        <nb-timepicker
          #timepicker="nbTimepicker"
          [useFullTimeFormat]="false"
          [step]="40"
          [isTwelveHoursFormat]="true"
          [withSeconds]="true"></nb-timepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./timepicker-example.scss'],
})
export class TimepickerShowcaseComponent {
}
