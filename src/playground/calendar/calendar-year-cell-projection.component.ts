/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-year-cell-projection',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" startView="year">
      <div *nbCalendarYear="let context">
        {{ context.date.getFullYear() }}
      </div>
    </nb-calendar>
  `,
})
export class NbCalendarYearCellProjectionComponent {
  date = new Date();
}
