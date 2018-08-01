/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbCalendarRange, NbDateTimeUtil } from '@nebular/theme';


@Component({
  selector: 'nb-calendar-range-showcase',
  template: `
    <h1>Selected range: {{ range.start | date }} - {{ range.end | date }}</h1>
    <nb-calendar-range [(range)]="range" [min]="min" [max]="max" [filter]="filter" [boundingMonth]="false">
    </nb-calendar-range>
  `,
})
export class NbCalendarRangeShowcaseComponent {
  range: NbCalendarRange = {
    start: NbDateTimeUtil.addDay(this.monthStart, 3),
    end: NbDateTimeUtil.addDay(this.monthStart, NbDateTimeUtil.getNumberOfDaysInMonth(this.monthStart) - 3),
  };

  get monthStart(): Date {
    return NbDateTimeUtil.getMonthStart(new Date());
  }

  min = new Date(2018, 6, 15);
  max = new Date(2018, 8, 15);
  filter = date => date.getDay() !== 0 && date.getDay() !== 6;
}
