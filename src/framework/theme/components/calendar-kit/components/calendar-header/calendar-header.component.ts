import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-calendar-header',
  template: `
    <h5>{{ date | nbCalendarDate }}</h5>
    <span class="header-today">Today</span>
  `,
})
export class NbCalendarHeaderComponent {
  date: Date = new Date();
}
