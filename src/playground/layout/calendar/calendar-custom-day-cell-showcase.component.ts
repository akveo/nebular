/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbpCalendarCustomDayCellComponent } from './components/calendar-custom-day-cell.component';

@Component({
  selector: 'nb-calendar-custom-day-cell-showcase',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar
      [(date)]="date"
      [dayCellComponent]="dayCellComponent"
      size="large"
    ></nb-calendar>
  `,
  entryComponents: [NbpCalendarCustomDayCellComponent],
})
export class NbCalendarCustomDayCellShowcaseComponent {
  date = new Date();
  dayCellComponent = NbpCalendarCustomDayCellComponent;
}
