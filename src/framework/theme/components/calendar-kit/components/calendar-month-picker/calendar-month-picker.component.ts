/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil, NbLocaleService } from '../../services';
import { batch, range } from '../../helpers';


// TODO refactor template with styles refactoring
@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  template: `
    <div class="chunk-row" *ngFor="let chunk of months">
      <div class="month"
           *ngFor="let month of chunk"
           [class.selected]="month.selected"
           (click)="onClick(month.value)">
        {{ month.label }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent implements OnInit {

  @Input() value: Date;

  @Output() valueChange = new EventEmitter<Date>();

  // TODO define type for month
  months: any[];

  constructor(private locale: NbLocaleService) {
  }

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const selectedMonth = this.value.getMonth();

    // TODO maybe we need one more util for cases like that?
    const months = range(12)
      .map(index => ({
        value: index,
        label: this.locale.getMonthNameByIndex(index),
        selected: selectedMonth === index,
      }));

    this.months = batch(months, 4);
  }

  onClick(month) {
    const year = this.value.getFullYear();
    const day = this.value.getDate();
    this.value = NbDateTimeUtil.createDate(year, month, day);
    this.valueChange.emit(this.value);
  }
}
