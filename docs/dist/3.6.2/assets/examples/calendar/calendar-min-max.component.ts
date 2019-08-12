import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-min-max',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" [min]="min" [max]="max">
    </nb-calendar>
  `,
})
export class CalendarMinMaxComponent {
  date = new Date();
  min = new Date(2018, 6, 15);
  max = new Date(2018, 8, 15);
}
