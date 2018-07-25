/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { batch, range } from '../../helpers';

// TODO i don't think we need defaults
const defaultYearCount = 20;

// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  template: `
    <nb-calendar-pageable-navigation
      [date]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (click)="changeMode.emit()">
    </nb-calendar-pageable-navigation>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of years">
        <div class="year"
             *ngFor="let year of chunk"
             [class.selected]="year.selected"
             (click)="onClick(year.value)">
          {{ year.value }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent implements OnInit {

  @Input() activeMonth: Date;
  @Input() startYear: number;

  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  @Output() changeMode = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  // TODO define type
  years: any[];

  constructor(private dateTimeUtil: NbDateTimeUtil) {
  }

  ngOnInit() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.dateTimeUtil.getYear(this.activeMonth);

    // TODO maybe we need one more util for cases like that?
    const years = range(defaultYearCount)
      .map(index => ({
        value: this.startYear + index,
        selected: selectedYear === this.startYear + index,
      }));

    this.years = batch(years, 4);
  }

  onClick(year) {
    const month = this.dateTimeUtil.getMonth(this.activeMonth);
    const day = this.dateTimeUtil.getDate(this.activeMonth);
    const event = this.dateTimeUtil.createDate(year, month, day);
    this.change.emit(event);
  }
}
