/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-filter',
  template: `
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" [filter]="filter">
    </nb-calendar>
  `,
})
export class CalendarFilterComponent {
  date = new Date();
  filter = date => date.getDay() !== 0 && date.getDay() !== 6;
}
