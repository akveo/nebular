import { Component, Input } from '@angular/core';
import { Day } from '../../models/day';

@Component({
  selector: 'nb-calendar-month-view-header',
  styleUrls: ['./calendar-month-view-header.component.scss'],
  template: `
    <div class="day" [class.holiday]="day.isHoliday" *ngFor="let day of days">
      {{ day.name }}
    </div>
  `,
})
export class NbCalendarMonthViewHeaderComponent {
  @Input() days: Day[] = [];
}
