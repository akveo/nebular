/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbCalendarBaseCellStateService, NbCalendarCellStatusService } from '@nebular/theme';

@Component({
  selector: 'nb-calendar-test',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-day-picker [activeMonth]="dayPickerActiveMonth" [(value)]="dayPickerDate">
        </nb-calendar-day-picker>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <nb-calendar-month-picker [(value)]="monthPickerActiveMonth"></nb-calendar-month-picker>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <nb-calendar-year-picker [(value)]="yearPickerActiveMonth"></nb-calendar-year-picker>
      </nb-card-body>
    </nb-card>
  `,
  providers: [{ provide: NbCalendarCellStatusService, useClass: NbCalendarBaseCellStateService }],
})
export class NbCalendarKitTestComponent {

  dayPickerActiveMonth = new Date();
  dayPickerDate = new Date();

  monthPickerActiveMonth = new Date();

  yearPickerActiveMonth = new Date();
}
