import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-actions',
  template: `
    <button
      nbButton
      ghost
      status="primary"
      size="small"
      (click)="setCurrentTime.emit()">
      {{ currentTimeText }}</button>
    <button
      nbButton
      status="primary"
      size="small"
      (click)="saveValue.emit()">
      {{ applyText }}</button>
  `,
  styleUrls: ['./calendar-actions.component.scss'],
})
export class NbCalendarActionsComponent {
  @Input() set applyButtonText(value: string) {
    this.applyText = value || 'OK';
  };
  @Input() set currentTimeButtonText(value: string) {
    this.currentTimeText = value || 'NOW';
  }
  applyText: string;
  currentTimeText: string;
  @Output() setCurrentTime: EventEmitter<void> = new EventEmitter();
  @Output() saveValue: EventEmitter<void> = new EventEmitter();
}
