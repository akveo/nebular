/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { NbCalendarCell } from '../../model';

@Component({
  selector: 'nb-calendar-cell',
  styleUrls: ['./calendar-cell.component.scss'],
  template: `
    <div class="calendar-cell" (click)="selectDate()">{{dayModel.date}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellComponent {

  @Input()
  public dayModel: NbCalendarCell = null;

  @Input()
  public isToday: boolean = false;

  @Input()
  public cellStates: Array<string> = [];

  @Output()
  public cellSelect = new EventEmitter<any>();

  @HostBinding('class')
  get cellClasses() {
    return this.cellStates.join(' ');
  }

  selectDate() {
    this.cellSelect.emit({
      date: this.dayModel.date,
      activeMonthDiff: this.dayModel.activeMonthDiff,
    });
  }
}
