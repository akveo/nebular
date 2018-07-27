/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-pageable-navigation.component.scss'],
  template: `
    <i class="nb-arrow-left" (click)="prev.emit()"></i>
    <nb-calendar-navigation [date]="date" (changeMode)="changeMode.emit()"></nb-calendar-navigation>
    <i class="nb-arrow-right" (click)="next.emit()"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPageableNavigationComponent {
  @Input() date: Date;
  @Output() changeMode = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
