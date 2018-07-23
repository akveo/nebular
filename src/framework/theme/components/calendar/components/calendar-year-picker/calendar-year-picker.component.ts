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
  Output,
  SimpleChanges,
} from '@angular/core';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { batch, range } from '../../helpers';
import { NbCalendarConfig } from '../../calendar-config';

// TODO i don't think we need defaults
const defaultStartYear = 2016;
const defaultYearCount = 16;

// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  template: `
    <nb-pageable-calendar-header
      [date]="activeMonth"
      (next)="next.emit()"
      (prev)="prev.emit()"
      (click)="changeMode.emit()">
    </nb-pageable-calendar-header>

    <div class="body">
      <div class="chunk-row" *ngFor="let chunk of years">
        <div class="year"
             *ngFor="let year of chunk"
             [class.selected]="year.selected"
             (click)="onSelect(year.value)">
          {{ year.value }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<D> implements OnChanges {

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

  ngOnChanges(changes: SimpleChanges) {
    // TODO I'm not sure we need this
    if (this.activeMonth && this.startYear && this.yearsToDisplay) {
      this.initYears();
    }
  }

  initYears() {
    const selectedYear = this.dateTimeUtil.getYear(this.activeMonth);

    // TODO maybe we need one more util for cases like that?
    const years = range(this.yearsToDisplay)
      .map(index => ({
        value: this.startYear + index,
        selected: selectedYear === this.startYear + index,
      }));

    this.years = batch(years, 4);
  }

  onSelect(year) {
    const month = this.dateTimeUtil.getMonth(this.activeMonth);
    const day = this.dateTimeUtil.getDate(this.activeMonth);
    const event = this.dateTimeUtil.createDate(year, month, day);
    this.change.emit(event);
  }
}
