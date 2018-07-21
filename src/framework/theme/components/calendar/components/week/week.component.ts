import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarWeekModel } from '../../models/calendar-week.model';

@Component({
  selector: 'nb-week',
  styleUrls: ['./week.component.scss'],
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
  @Input() week: NbCalendarWeekModel;
  @Output() cellSelect = new EventEmitter<any>();
}
