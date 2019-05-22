/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbCalendarDay } from '../../model';
import { NbDateService } from '../../services/date.service';


@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDaysNamesComponent<D> implements OnInit {

  days: NbCalendarDay[];

  constructor(private dateService: NbDateService<D>) {
  }

  ngOnInit() {
    const days: NbCalendarDay[] = this.createDaysNames();
    this.days = this.shiftStartOfWeek(days);
  }

  private createDaysNames(): NbCalendarDay[] {
    return this.dateService.getDayOfWeekNames()
      .map(this.markIfHoliday);
  }

  private shiftStartOfWeek(days: NbCalendarDay[]): NbCalendarDay[] {
    for (let i = 0; i < this.dateService.getFirstDayOfWeek(); i++) {
      days.push(days.shift());
    }

    return days;
  }

  private markIfHoliday(name, i) {
    return { name, isHoliday: i % 6 === 0 };
  }
}
