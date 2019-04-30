/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-start-view',
  template: `
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" startView="month">
    </nb-calendar>
  `,
})
export class CalendarStartViewComponent {
  date = new Date();
}
