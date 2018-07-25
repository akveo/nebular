import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-navigation',
  styleUrls: ['./calendar-navigation.component.scss'],
  template: `
    <div class="header single-page">
      <button class="btn btn-success" (click)="click.emit()">
        {{ date | nbCalendarDate }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NbCalendarNavigationComponent {
  @Input() date: Date;
  @Output() click = new EventEmitter<void>();
}
