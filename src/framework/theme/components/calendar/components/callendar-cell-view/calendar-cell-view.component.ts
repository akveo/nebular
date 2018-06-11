/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NbCalendarCellModel } from '../../models/calendar-cell.model';

/**
 */
@Component({
  selector: 'nb-calendar-cell-view',
  styleUrls: ['./calendar-cell-view.component.scss'],
  templateUrl: './calendar-cell-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellViewComponent {

  @Input()
  public dayModel: NbCalendarCellModel = null;

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
