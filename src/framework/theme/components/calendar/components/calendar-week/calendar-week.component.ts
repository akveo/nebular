import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarWeek } from '../../model';

@Component({
  selector: 'nb-calendar-week',
  styleUrls: ['./calendar-week.component.scss'],
  template: `
    <div *ngIf="week.padLeft" class="placeholder-before" [ngStyle]="{ flex: week.padLeft }"></div>
    <nb-calendar-cell
      *ngFor="let day of week.cells"
      [dayModel]="day"
      [cellStates]="day.cellStates"
      (cellSelect)="cellSelect.emit($event)"
    >
    </nb-calendar-cell>
    <div *ngIf="week.padRight" class="placeholder-after" [ngStyle]="{ flex: week.padRight }"></div>
  `,
})

export class NbWeekComponent {
  @Input() week: NbCalendarWeek;
  @Output() cellSelect = new EventEmitter<any>();
}
