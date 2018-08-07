/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbCalendarDay } from '../../model';
import { NbDateTimeUtil, NbLocaleService } from '../../services';


@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDaysNamesComponent implements OnInit {

  days: NbCalendarDay[];

  constructor(private locale: NbLocaleService) {
  }

  ngOnInit() {
    const days: NbCalendarDay[] = this.createDaysNames();
    this.days = this.shiftStartOfWeek(days);
  }

  private createDaysNames(): NbCalendarDay[] {
    return this.locale.getDayOfWeekNames()
      .map(NbDateTimeUtil.markIfHoliday);
  }

  private shiftStartOfWeek(days: NbCalendarDay[]): NbCalendarDay[] {
    for (let i = 0; i < this.locale.getFirstDayOfWeek(); i++) {
      days.push(days.shift());
    }

    return days;
  }
}
