/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { NbCalendarWeeksFactoryService } from '../../service';
import { NbCalendarCell } from '../../model';

@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  template: `
    <nb-calendar-pageable-navigation
      [date]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (select)="changeMode.emit()">
    </nb-calendar-pageable-navigation>

    <div class="body">
      <nb-calendar-days-names></nb-calendar-days-names>
      <nb-calendar-week
        *ngFor="let week of weeks"
        [week]="week"
        (click)="onSelect($event)">
      </nb-calendar-week>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<T> implements OnChanges {

  @Input() activeMonth: Date;
  @Input() today: Date;
  @Input() selectedValue: T;
  @Input() displayBoundingMonths: boolean = true;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() changeMode = new EventEmitter<void>();

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
