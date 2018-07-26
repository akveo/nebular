/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from '../../services';
import { batch, range } from '../../helpers';

// TODO i don't think we need defaults
const defaultYearCount = 20;

// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  template: `
    <div class="chunk-row" *ngFor="let chunk of years">
      <div class="year"
           *ngFor="let year of chunk"
           [class.selected]="year.selected"
           (click)="onClick(year.value)">
        {{ year.value }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent implements OnInit {

  @Input() value: Date;

  @Output() valueChange = new EventEmitter<any>();

  // TODO define type
  years: any[];

  ngOnInit() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.value.getFullYear();
    const startYear = Math.ceil(selectedYear - defaultYearCount / 2);

    // TODO maybe we need one more util for cases like that?
    const years = range(defaultYearCount)
      .map(index => ({
        value: startYear + index,
        selected: selectedYear === startYear + index,
      }));

    this.years = batch(years, 4);
  }

  onClick(year) {
    const month = this.value.getMonth();
    const day = this.value.getDate();
    const event = NbDateTimeUtil.createDate(year, month, day);
    this.valueChange.emit(event);
  }
}
