import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarCell } from '../../model';

@Component({
  selector: 'nb-calendar-week',
  styleUrls: ['./calendar-week.component.scss'],
  template: `
    <nb-calendar-cell
      *ngFor="let cell of week"
      (click)="click.emit(cell)"
      [date]="cell.date"
      [state]="cell.state">
    </nb-calendar-cell>
  `,
})
export class NbCalendarWeekComponent<D> {
  // TODO accept only cells, not week
  @Input() week: NbCalendarCell<D>[];
  @Output() click = new EventEmitter<NbCalendarCell<D>>();
}
