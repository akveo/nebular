import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-bounding-month',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" [boundingMonth]="false">
    </nb-calendar>
  `,
})
export class NbCalendarBoundingMonthComponent {
  date = new Date();
}
