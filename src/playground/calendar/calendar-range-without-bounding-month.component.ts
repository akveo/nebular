/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbCalendarRange, NbDateTimeUtil } from '@nebular/theme';


@Component({
  selector: 'nb-calendar-range-bounding-month',
  template: `
    <h1>Selected range: {{ range.start | date }} - {{ range.end | date }}</h1>
    <nb-calendar-range [(range)]="range" [boundingMonth]="false"></nb-calendar-range>
  `,
})
export class NbCalendarRangeBoundingMonthComponent {
  range: NbCalendarRange = {
    start: NbDateTimeUtil.addDay(this.monthStart, 5),
    end: NbDateTimeUtil.addDay(new Date(), 2),
  };

  get monthStart(): Date {
    return NbDateTimeUtil.getMonthStart(new Date());
  }
}
