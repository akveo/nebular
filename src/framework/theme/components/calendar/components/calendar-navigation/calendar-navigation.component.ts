import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-navigation',
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }
  `],
  template: `
    <button class="btn btn-success" (click)="select.emit()">
      {{ date | nbCalendarDate }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarNavigationComponent {
  @Input() date: Date;
  @Output() select = new EventEmitter<void>();
}
