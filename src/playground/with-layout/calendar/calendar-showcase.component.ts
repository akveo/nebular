/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-showcase',
  template: `
    <nb-card>
      <nb-card-header>
        <h1 class="h5">Selected date: {{ date | date }}</h1>
      </nb-card-header>
      <nb-card-body>
        <nb-calendar [(date)]="date">
        </nb-calendar>
      </nb-card-body>
    </nb-card>
  `,
})
export class CalendarShowcaseComponent {
  date = new Date();
}
