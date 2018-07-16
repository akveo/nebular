import { Component, EventEmitter, Output } from '@angular/core';
import { NbCalendarHeaderComponent } from './calendar-header.component';

@Component({
  selector: 'nb-pageable-calendar-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `
    <div class="header">
      <i class="nb-arrow-left" (click)="forward.emit()"></i>
      <button class="btn btn-success" (click)="select.emit()">
        <ng-content></ng-content>
      </button>
      <i class="nb-arrow-right" (click)="backward.emit()"></i>
    </div>
  `,
})

export class NbPageableCalendarHeaderComponent extends NbCalendarHeaderComponent {
  @Output() forward: EventEmitter = new EventEmitter<any>();
  @Output() backward: EventEmitter = new EventEmitter<any>();
}
