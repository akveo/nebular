/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { NbCalendarCellState } from '../../model';

@Component({
  selector: 'nb-calendar-cell',
  styleUrls: ['./calendar-cell.component.scss'],
  template: `
    <div class="calendar-cell" (click)="select.emit()">{{ date }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellComponent {
  @Input() date: number;
  @Input() state: NbCalendarCellState[];

  @Output() select = new EventEmitter<void>();

  @HostBinding('class')
  get cellStates() {
    return this.state.join(' ');
  }
}
