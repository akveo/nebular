/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';

import { NbCalendarModelFactoryService } from '../../../../../../../src/framework/theme/components/calendar/models/factory/calendar-model-factory.service';
import { NbDateTimeUtil } from '../../service/date-time-util.interface';
import { NbArrayHelper } from '../../helpers/array.helper';

const defaultStartYear = 2016;
const defaultYearCount = 20;

/**
 */
@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  templateUrl: './calendar-year-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<D> implements OnInit, OnChanges {

  @Input()
  value: D;

  @Input()
  public startYear: number = defaultStartYear;

  @Input()
  public yearCount: number = defaultYearCount;

  @Input()
  public currentDate: D;

  @Output()
  change = new EventEmitter<any>();

  years: any[];

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>,
              private dateTimeUtil: NbDateTimeUtil<D>,
              private arrayHelper: NbArrayHelper) {}

  ngOnInit() {
    this.currentDate = this.currentDate || this.dateTimeUtil.createNowDate();
    this.value = this.value || this.dateTimeUtil.clone(this.currentDate);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.value && this.startYear && this.yearCount) {
      this.initYears();
    }
  }

  initYears() {
    const selectedYear = this.dateTimeUtil.getYear(this.value);

    const years = Array.from(Array(this.yearCount).keys())
      .map(index => ({
        value: this.startYear + index,
        selected: selectedYear === this.startYear + index,
      }));

    this.years = this.arrayHelper.splitToChunks(years, 4);
  }

  onYearSelect(year) {
    this.value = this.dateTimeUtil.createDate(
      year,
      this.dateTimeUtil.getMonth(this.value),
      this.dateTimeUtil.getDate(this.value),
    );
    this.change.emit(this.value);
  }
}
