/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-custom-month-cell',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" startView="month">
    </nb-calendar>
  `,
})
export class NbCalendarCustomMonthCellComponent {
  date = new Date();
}
