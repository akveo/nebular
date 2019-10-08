import { Component } from '@angular/core';

@Component({
  template: `
    <button (click)="toggleWeekNumber()" nbButton>
      {{ this.showWeekNumber ? 'Hide' : 'Show' }} week number column
    </button>

    <nb-calendar [(date)]="date" [showWeekNumber]="showWeekNumber"></nb-calendar>
  `,
  styles: [` button { margin-bottom: 1rem; } `],
})
export class CalendarWeekNumberComponent {
  showWeekNumber = true;
  date = new Date();

  toggleWeekNumber() {
    this.showWeekNumber = !this.showWeekNumber;
  }
}
