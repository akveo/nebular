/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { NbCalendarWeeksFactoryService } from '../../services';
import { NbCalendarCell } from '../../model';

@Component({
  selector: 'nb-calendar-day-picker',
  styleUrls: ['./calendar-day-picker.component.scss'],
  template: `
    <div class="body">
      <nb-calendar-days-names></nb-calendar-days-names>
      <div class="week" *ngFor="let week of weeks">
        <nb-calendar-cell
          *ngFor="let cell of week"
          (click)="onSelect(cell)"
          [cell]="cell">
        </nb-calendar-cell>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayPickerComponent<T> implements OnChanges {

  @Input() activeMonth: Date;
  @Input() today: Date;
  @Input() selectedValue: T;
  @Input() displayBoundingMonths: boolean = true;

  @Output() change = new EventEmitter<Date>();

  weeks: NbCalendarCell[][];

  constructor(private calendarModelFactory: NbCalendarWeeksFactoryService<T>) {
  }

  ngOnChanges() {
    if (this.activeMonth) {
      this.invalidateModel();
    }
  }

  onSelect(cell: NbCalendarCell) {
    this.change.emit(cell.date);
  }

  private invalidateModel() {
    this.weeks = this.calendarModelFactory.createWeeks({
      activeMonth: this.activeMonth,
      selectedValue: this.selectedValue,
      today: this.today,
      includeBoundingMonths: this.displayBoundingMonths,
    });
  }
}
