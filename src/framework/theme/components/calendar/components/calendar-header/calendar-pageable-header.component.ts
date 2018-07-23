import { Component, EventEmitter, Output } from '@angular/core';
import { NbCalendarHeaderComponent } from './calendar-header.component';

@Component({
  selector: 'nb-calendar-pageable-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `
    <div class="header">
      <i class="nb-arrow-left" (click)="prev.emit()"></i>
      <button class="btn btn-success" (click)="select.emit()">
        {{ date | nbCalendarDate }}
      </button>
      <i class="nb-arrow-right" (click)="next.emit()"></i>
    </div>
  `,
})

export class NbCalendarPageableHeaderComponent<D> extends NbCalendarHeaderComponent<D> {
  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
}
