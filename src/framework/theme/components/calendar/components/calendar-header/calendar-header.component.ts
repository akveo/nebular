import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `
    <div class="header single-page">
      <button class="btn btn-success" (click)="select.emit()">
        {{ activeMonth | nbCalendarDate }}
      </button>
    </div>
  `,
})

export class NbCalendarHeaderComponent<D> {
  @Input() activeMonth: D;
  @Output() select = new EventEmitter<any>();
}
