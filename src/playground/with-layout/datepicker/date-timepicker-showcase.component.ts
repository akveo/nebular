/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NbTimePickerDirective } from '../../../framework/theme/components/timepicker/timepicker.directive';

@Component({
  selector: 'nb-timepicker-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card size="large">
      <nb-card-body class="example-items-col">
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formpicker">
        <nb-date-timepicker
          #item
          [isTwelveHoursFormat]="true"
          [withSeconds]="false"
          [title]="'Title'"
          [useFullTimeFormat]="true"
          #formpicker></nb-date-timepicker>
      </nb-card-body>
    </nb-card>
  `,
})
export class DateTimepickerShowcaseComponent {
 // todo: check show method

  @ViewChild('item') dte;
  @ViewChild(NbTimePickerDirective) time;

}
