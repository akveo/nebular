import { Component, Input } from '@angular/core';
import { NbCalendarDay } from '../../model';

@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: `
    <div class="day" [class.holiday]="day.isHoliday" *ngFor="let day of days">
      {{ day.name }}
    </div>
  `,
})
export class NbCalendarDaysNamesComponent {
  @Input() days: NbCalendarDay[] = [];
}
