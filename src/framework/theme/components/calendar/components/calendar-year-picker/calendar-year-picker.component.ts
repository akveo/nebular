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
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { batch } from '../../helpers';
import { NbCalendarConfig } from '../../calendar-config';

const defaultStartYear = 2016;
const defaultYearCount = 16;

/**
 */
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  template: `
    <nb-pageable-calendar-header
      [activeMonth]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (select)="changeMode.emit()">
    </nb-pageable-calendar-header>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of years">
        <div class="year"
             *ngFor="let year of chunk"
             [class.selected]="year.selected"
             (click)="onYearSelect(year.value)">
          {{ year.value }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<D> implements OnInit, OnChanges {

  @Input() activeMonth: D;
  @Input() startYear: number = defaultStartYear;
  @Input() config: NbCalendarConfig;
  @Input() today: D;

  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  @Output() changeMode = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  years: any[];

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  get yearsToDisplay(): number {
    return this.config.yearsToDisplayNumber || defaultYearCount;
  }

  ngOnInit() {
    this.today = this.today || this.dateTimeUtil.createNowDate();
    this.activeMonth = this.activeMonth || this.dateTimeUtil.clone(this.today);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.activeMonth && this.startYear && this.yearsToDisplay) {
      this.initYears();
    }
  }

  initYears() {
    const selectedYear = this.dateTimeUtil.getYear(this.activeMonth);

    const years = Array.from(Array(this.yearsToDisplay).keys())
      .map(index => ({
        value: this.startYear + index,
        selected: selectedYear === this.startYear + index,
      }));

    this.years = batch(years, 4);
  }

  onYearSelect(year) {
    this.activeMonth = this.dateTimeUtil.createDate(
      year,
      this.dateTimeUtil.getMonth(this.activeMonth),
      this.dateTimeUtil.getDate(this.activeMonth),
    );
    this.change.emit(this.activeMonth);
  }
}
