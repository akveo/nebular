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
    <nb-calendar-range [(range)]="range">
    </nb-calendar-range>
  `,
})
export class NbCalendarRangeShowcaseComponent {
  range: NbCalendarRange = {
    start: NbDateTimeUtil.addDay(this.monthStart, 3),
    end: NbDateTimeUtil.addDay(this.monthEnd, -3),
  };

  get monthStart(): Date {
    return NbDateTimeUtil.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return NbDateTimeUtil.getMonthEnd(new Date());
  }
}
