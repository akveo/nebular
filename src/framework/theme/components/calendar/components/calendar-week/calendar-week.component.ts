import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarCell, NbCalendarWeek } from '../../model';

@Component({
  selector: 'nb-calendar-week',
  styleUrls: ['./calendar-week.component.scss'],
  template: `
    <nb-calendar-cell
      *ngFor="let cell of week.cells"
      (select)="select.emit(cell)"
      [date]="cell.date"
      [states]="cell.state">
    </nb-calendar-cell>
  `,
})

export class NbCalendarWeekComponent {
  @Input() week: NbCalendarWeek;
  @Output() select = new EventEmitter<NbCalendarCell>();
}
