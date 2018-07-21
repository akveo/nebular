import { Component, Input } from '@angular/core';
import { NbCalendarDay } from '../../model';

@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `,
})
export class NbCalendarDaysNamesComponent {
  @Input() days: NbCalendarDay[] = [];
}
