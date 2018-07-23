import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `
    <div class="header single-page">
      <button class="btn btn-success" (click)="click.emit()">
        {{ date | nbCalendarDate }}
      </button>
    </div>
  `,
})

export class NbCalendarHeaderComponent<D> {
  @Input() date: D;
  @Output() click = new EventEmitter<void>();
}
