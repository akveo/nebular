/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { NbCalendarDay, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NbDateService } from '../../services/date.service';

@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: ` <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbCalendarDaysNamesComponent<D> implements OnInit, OnChanges {
  days: NbCalendarDay[];

  @Input() size: NbCalendarSize;
  static ngAcceptInputType_size: NbCalendarSizeValues;

  @HostBinding('class.size-large')
  get isLarge(): boolean {
    return this.size === NbCalendarSize.LARGE;
  }

  /**
   * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
   * `undefined` means that default locale setting will be used.
   * */
  @Input() firstDayOfWeek: number | undefined;

  constructor(private dateService: NbDateService<D>) {}

  ngOnInit() {
    const days: NbCalendarDay[] = this.createDaysNames();
    this.days = this.shiftStartOfWeek(days);
  }

  ngOnChanges({ firstDayOfWeek }: SimpleChanges) {
    if (firstDayOfWeek) {
      const days: NbCalendarDay[] = this.createDaysNames();
      this.days = this.shiftStartOfWeek(days);
    }
  }

  private createDaysNames(): NbCalendarDay[] {
    return this.dateService.getDayOfWeekNames().map(this.markIfHoliday);
  }

  private shiftStartOfWeek(days: NbCalendarDay[]): NbCalendarDay[] {
    const firstDayOfWeek = this.firstDayOfWeek ?? this.dateService.getFirstDayOfWeek();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(days.shift());
    }

    return days;
  }

  private markIfHoliday(name, i) {
    return { name, isHoliday: i % 6 === 0 };
  }
}
