/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'npg-calendar-min-max',
  template: `
    <nb-card>
      <nb-card-header>
        <h1 class="h5">Selected date: {{ date | date }}</h1>
      </nb-card-header>
      <nb-card-body>
        <nb-calendar [(date)]="date" [min]="min" [max]="max"></nb-calendar>
      </nb-card-body>
    </nb-card>
  `,
})
export class CalendarMinMaxComponent {
  date: Date;
  min: Date;
  max: Date;

  constructor(dateService: NbDateService<Date>) {
    this.date = dateService.today();
    this.date.setDate(15);
    this.min = dateService.addDay(this.date, -7);
    this.max = dateService.addDay(this.date, 7);
  }
}
