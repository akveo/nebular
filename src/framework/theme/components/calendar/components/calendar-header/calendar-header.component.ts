import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `
    <div class="header single-page">
      <button class="btn btn-success" (click)="select.emit()">
        <ng-content></ng-content>
      </button>
    </div>
  `,
})

export class NbCalendarHeaderComponent {
  @Output() select: EventEmitter = new EventEmitter<any>();
}
