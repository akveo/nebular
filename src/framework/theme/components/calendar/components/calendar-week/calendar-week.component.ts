import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarCell, NbCalendarWeek } from '../../model';

@Component({
  selector: 'nb-calendar-week',
  styleUrls: ['./calendar-week.component.scss'],
  template: `
    <nb-calendar-cell
      *ngFor="let cell of week.cells"
      (click)="click.emit(cell)"
      [date]="cell.date"
      [state]="cell.state">
    </nb-calendar-cell>
  `,
})
export class NbCalendarWeekComponent {
  // TODO accept only cells, not week
  @Input() week: NbCalendarWeek;
  @Output() click = new EventEmitter<NbCalendarCell>();
}
