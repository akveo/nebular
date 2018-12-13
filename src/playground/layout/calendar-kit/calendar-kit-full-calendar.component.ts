import { Component } from '@angular/core';
import { NbCalendarKitMonthCellComponent } from './components/calendar-kit-month-cell.component';

@Component({
  selector: 'nb-calendar-kit-full-calendar-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-month-picker
          [(month)]="month"
          [cellComponent]="monthCellComponent"
        ></nb-calendar-month-picker>
      </nb-card-body>
    </nb-card>
  `,
  entryComponents: [NbCalendarKitMonthCellComponent],
})
export class NbCalendarKitFullCalendarShowcaseComponent {
  month = new Date();
  monthCellComponent = NbCalendarKitMonthCellComponent;
}
