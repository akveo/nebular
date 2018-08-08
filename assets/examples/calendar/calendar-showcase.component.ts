import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-showcase',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date">
    </nb-calendar>
  `,
})
export class NbCalendarShowcaseComponent {
  date = new Date();
}
