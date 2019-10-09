/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbLayoutDirectionService } from '../../../../services/direction.service';


@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-pageable-navigation.component.scss'],
  template: `
    <button nbButton (click)="prev.emit()" ghost size="small" class="prev-month">
      <nb-icon [icon]="isLtr ? 'chevron-left-outline' : 'chevron-right-outline'" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-calendar-navigation [date]="date" (changeMode)="changeMode.emit()"></nb-calendar-navigation>
    <button nbButton (click)="next.emit()" ghost size="small" class="next-month">
      <nb-icon [icon]="isLtr ? 'chevron-right-outline' : 'chevron-left-outline'" pack="nebular-essentials"></nb-icon>
    </button>
  `,
})
export class NbCalendarPageableNavigationComponent<D> {
  @Input() date: D;
  @Output() changeMode = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor(private directionService: NbLayoutDirectionService) {
  }

  get isRtl(): boolean {
    return this.directionService.isRtl();
  }

  get isLtr(): boolean {
    return this.directionService.isLtr();
  }
}
