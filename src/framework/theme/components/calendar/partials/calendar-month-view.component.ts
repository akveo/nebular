/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { NbCalendarModelFactoryService } from '../models/calendar-model-factory.service';

/**
 */
@Component({
  selector: 'nb-calendar-month-view',
  styleUrls: ['./calendar-month-view.component.scss'],
  templateUrl: './calendar-month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthViewComponent<D> implements OnInit, OnChanges {

  @Input()
  public includeBoundingMonths: boolean = true;

  @Input()
  public currentDate: D = null;

  @Input()
  public activeMonth: D = null;

  @Input()
  public selectedValue: D = null;

  month = [];

  constructor(private calendarModelFactory: NbCalendarModelFactoryService<D>) {}

  ngOnInit() {
    this.month = this.calendarModelFactory.createMonthModel(this.activeMonth, this.includeBoundingMonths);
  }

  ngOnChanges() {
    this.month = this.calendarModelFactory.createMonthModel(this.activeMonth, this.includeBoundingMonths);
  }

}
