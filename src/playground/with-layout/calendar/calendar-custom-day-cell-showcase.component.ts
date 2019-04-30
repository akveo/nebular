/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { CalendarCustomDayCellComponent } from './components/calendar-custom-day-cell.component';

@Component({
  selector: 'nb-calendar-custom-day-cell-showcase',
  template: `
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar
      [(date)]="date"
      [dayCellComponent]="dayCellComponent"
      size="large"
    ></nb-calendar>
  `,
  entryComponents: [CalendarCustomDayCellComponent],
})
export class CalendarCustomDayCellShowcaseComponent {
  date = new Date();
  dayCellComponent = CalendarCustomDayCellComponent;
}
