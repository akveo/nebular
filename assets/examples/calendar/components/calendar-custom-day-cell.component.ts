import { Component } from '@angular/core';
import { NbCalendarDayCellComponent } from '@nebular/theme';

@Component({
  selector: 'nb-calendar-custom-day-cell',
  styles: [`
    .cell-content {
      flex-direction: column;
    }
  `],
  template: `
    <div class="cell-content">
      <div>{{ day }}</div>
      <span class="caption" [class.text-control]="selected">{{ (day + 100) * day }}$</span>
    </div>
  `,
})
export class CalendarCustomDayCellComponent extends NbCalendarDayCellComponent<Date> {
}
