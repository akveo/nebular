/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-min-max',
  template: `
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" [min]="min" [max]="max">
    </nb-calendar>
  `,
})
export class CalendarMinMaxComponent {
  date = new Date();
  min = new Date(2018, 6, 15);
  max = new Date(2018, 8, 15);
}
