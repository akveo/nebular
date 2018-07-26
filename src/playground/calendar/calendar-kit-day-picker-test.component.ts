/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbCalendarCellStateService, NbCellStateService } from '@nebular/theme';

@Component({
  selector: 'nb-calendar-test',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-day-picker [activeMonth]="activeMonth" [(value)]="date">
        </nb-calendar-day-picker>
      </nb-card-body>
    </nb-card>
  `,
  providers: [{ provide: NbCellStateService, useClass: NbCalendarCellStateService }],
})
export class NbCalendarKitTestComponent {
  activeMonth = new Date();
  date = new Date();
}
