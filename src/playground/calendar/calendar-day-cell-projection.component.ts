/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-day-cell-projection',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date">
      <div *nbCalendarDay="let context">
        {{ context.date.getDate() }}
      </div>
    </nb-calendar>
  `,
})
export class NbCalendarDayCellProjectionComponent {
  date = new Date();
}
