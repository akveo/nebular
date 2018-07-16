import { Component, Input } from '@angular/core';
import { Day } from '../../models/day';

@Component({
  selector: 'nb-days-names',
  styleUrls: ['./days-names.component.scss'],
  template: `
    <div class="day" [class.holiday]="day.isHoliday" *ngFor="let day of days">
      {{ day.name }}
    </div>
  `,
})
export class NbDaysNamesComponent {
  @Input() days: Day[] = [];
}
