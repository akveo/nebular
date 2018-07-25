import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-pageable-navigation.component.scss'],
  template: `
    <div class="header">
      <i class="nb-arrow-left" (click)="prev.emit()"></i>
      <nb-calendar-navigation [date]="date" (select)="select.emit()"></nb-calendar-navigation>
      <i class="nb-arrow-right" (click)="next.emit()"></i>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPageableNavigationComponent {
  @Input() date: Date;
  @Output() select = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
