import { Component } from '@angular/core';
import { CalendarKitMonthCellComponent } from './components/calendar-kit-month-cell.component';

@Component({
  selector: 'npg-calendar-kit-full-calendar-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-month-picker [(month)]="month" [date]="month" [cellComponent]="monthCellComponent">
        </nb-calendar-month-picker>
      </nb-card-body>
    </nb-card>
  `,
})
export class CalendarKitFullCalendarShowcaseComponent {
  month = new Date();
  monthCellComponent = CalendarKitMonthCellComponent;
}
