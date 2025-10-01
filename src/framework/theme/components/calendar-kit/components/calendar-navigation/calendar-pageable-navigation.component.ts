/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';

import { NbLayoutDirectionService } from '../../../../services/direction.service';

@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-pageable-navigation.component.scss'],
  template: `
    <button nbButton (click)="prev.emit()" ghost status="basic" class="prev-month">
      <nb-icon [icon]="isLtr ? 'chevron-left-outline' : 'chevron-right-outline'" pack="nebular-essentials"></nb-icon>
    </button>
    <button nbButton (click)="next.emit()" ghost status="basic" class="next-month">
      <nb-icon [icon]="isLtr ? 'chevron-right-outline' : 'chevron-left-outline'" pack="nebular-essentials"></nb-icon>
    </button>
  `,
  standalone: false,
})
export class NbCalendarPageableNavigationComponent<D> {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor(private directionService: NbLayoutDirectionService) {}

  get isLtr(): boolean {
    return this.directionService.isLtr();
  }
}
