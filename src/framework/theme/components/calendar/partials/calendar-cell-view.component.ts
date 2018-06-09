/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarCellModel } from '../models/calendar-cell.model';

/**
 */
@Component({
  selector: 'nb-calendar-cell-view',
  styleUrls: ['./calendar-cell-view.component.scss'],
  templateUrl: './calendar-cell-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarCellViewComponent<D> {

  @Input()
  public dayModel: NbCalendarCellModel = null;

  @Output()
  public onCellSelect = new EventEmitter<D>();

  public onCellHover = new EventEmitter<D>();

  selectDate() {
    this.onCellHover.emit()
  }

}
