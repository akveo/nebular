/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-showcase',
  template: `
    <button (click)="toggleSize()">toggle size</button>
    <br>
    <button (click)="toggleShowWeeks()">toggle weeks</button>
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date">
    </nb-calendar>
  `,
})
export class CalendarShowcaseComponent {
  date = new Date();

  size = 'medium';

  showWeekNumber = false;

  toggleSize() {
    if (this.size === 'medium') {
      this.size = 'large';
    } else {
      this.size = 'medium';
    }
  }

  toggleShowWeeks() {
    this.showWeekNumber = !this.showWeekNumber;
  }
}
