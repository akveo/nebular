/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-showcase',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" [min]="min" [max]="max" [filter]="filter" [boundingMonth]="false">
    </nb-calendar>
  `,
})
export class NbCalendarShowcaseComponent {
  date = new Date();
  min = new Date(2018, 6, 15);
  max = new Date(2018, 8, 15);
  filter = date => date.getDay() !== 0 && date.getDay() !== 6;
}
