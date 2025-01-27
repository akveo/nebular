import { Component } from '@angular/core';
import { NbDateService, NbCalendarRange } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <div class="example-items-rows">
          <button (click)="toggleSize()" nbButton>Change to {{ this.size === 'medium' ? 'large' : 'medium' }}</button>
          <button (click)="toggleWeekNumber()" nbButton>
            {{ this.showWeekNumber ? 'Hide' : 'Show' }} week number column
          </button>
        </div>

        <div class="example-items-rows">
          <nb-calendar [(date)]="date" [showWeekNumber]="showWeekNumber" [size]="size"></nb-calendar>
          <nb-calendar-range [(range)]="dateRange" [showWeekNumber]="showWeekNumber" [size]="size"> </nb-calendar-range>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styles: [
    `
      button {
        margin-bottom: 1rem;
      }
    `,
  ],
  standalone: false,
})
export class CalendarWeekNumberComponent {
  showWeekNumber = false;
  size: 'large' | 'medium' = 'medium';
  date: Date;
  dateRange: NbCalendarRange<Date>;

  constructor(dateService: NbDateService<Date>) {
    this.date = dateService.today();
    const yesterday = dateService.addDay(this.date, -1);
    const tomorrow = dateService.addDay(this.date, 1);
    this.dateRange = { start: yesterday, end: tomorrow };
  }

  toggleWeekNumber() {
    this.showWeekNumber = !this.showWeekNumber;
  }

  toggleSize() {
    this.size = this.size === 'medium' ? 'large' : 'medium';
  }
}
