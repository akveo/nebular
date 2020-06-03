import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-actions',
  template: `
    <button nbButton ghost status="primary" size="small" (click)="setCurrentTime.emit()">NOW</button>
    <button nbButton status="primary" size="small" (click)="saveValue.emit()">OK</button>
  `,
  styleUrls: ['./calendar-actions.component.scss'],
})
export class NbCalendarActionsComponent {
  @Output() setCurrentTime: EventEmitter<void> = new EventEmitter(true);
  @Output() saveValue: EventEmitter<void> = new EventEmitter(true);
}
