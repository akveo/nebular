import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-size',
  template: `
    <h1 class="h5">Selected date: {{ date | date }}</h1>
    <nb-calendar [(date)]="date" size="large">
    </nb-calendar>
  `,
})
export class CalendarSizeComponent {
  date = new Date();
}
