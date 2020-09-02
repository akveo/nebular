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
      {{ _currentTimeText }}</button>
    <button
      nbButton
      status="primary"
      size="small"
      (click)="saveValue.emit()">
      {{ _applyText }}</button>
  `,
  styleUrls: ['./calendar-actions.component.scss'],
})
export class NbCalendarActionsComponent {
  @Input() set applyButtonText(value: string) {
    if (value) {
      this._applyText = value;
    }
  };
  @Input() set currentTimeButtonText(value: string) {
    if (value) {
      this._currentTimeText = value;
    }
  }
  _applyText: string = 'ok';
  _currentTimeText: string = 'now';
  @Output() setCurrentTime: EventEmitter<void> = new EventEmitter();
  @Output() saveValue: EventEmitter<void> = new EventEmitter();
}
