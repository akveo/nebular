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
    <div class="calendar-cell" (click)="click.emit()">{{ date }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellComponent {
  @Input('date')
  set _date(date: Date) {
    this.date = date.getDate();
  }

  @Input() state: NbCalendarCellState[];

  @Output() click = new EventEmitter<void>();

  @HostBinding('class')
  get cellStates() {
    return this.state.join(' ');
  }

  date: number;
}
