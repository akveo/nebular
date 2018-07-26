/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { NbCalendarCell, NbCalendarCellState } from '../../model';

@Component({
  selector: 'nb-calendar-cell',
  styleUrls: ['./calendar-cell.component.scss'],
  template: `
    <div class="calendar-cell">{{ date }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellComponent {
  date: number;
  state: NbCalendarCellState[];

  @Input()
  set cell(cell: NbCalendarCell) {
    this.date = cell.date.getDate();
    this.state = cell.state;
  }

  @HostBinding('class')
  get cellStates() {
    return this.state.join(' ');
  }
}
