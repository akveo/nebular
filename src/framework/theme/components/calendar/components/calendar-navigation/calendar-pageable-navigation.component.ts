import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NbCalendarNavigationComponent } from './calendar-navigation.component';

@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-navigation.component.scss'],
  template: `
    <div class="header">
      <i class="nb-arrow-left" (click)="prev.emit()"></i>
      <button class="btn btn-success" (click)="click.emit()">
        {{ date | nbCalendarDate }}
      </button>
      <i class="nb-arrow-right" (click)="next.emit()"></i>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NbCalendarPageableNavigationComponent extends NbCalendarNavigationComponent {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
