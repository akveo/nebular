/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { NbDateService } from '../../services/date.service';
import { NbCalendarSize } from '../../model';

@Component({
  selector: 'nb-calendar-week-numbers',
  template: `
    <div class="sign">#</div>
    <div class="week-cell" *ngFor="let week of getWeeks()">{{ week }}</div>
  `,
  styleUrls: ['./nb-calendar-week-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarWeekNumberComponent<D> {

  @Input()
  weeks: D[][];

  @Input()
  size: NbCalendarSize;

  @HostBinding('class.size-medium')
  get isMedium() {
    return this.size === NbCalendarSize.MEDIUM;
  }

  @HostBinding('class.size-large')
  get isLarge() {
    return this.size === NbCalendarSize.LARGE;
  }

  constructor(private dateService: NbDateService<D>) {}

  getWeeks(): number[] {
    return this.weeks.reduce((weeks: number[], week: D[]) => {
      weeks.push(this.dateService.getWeekNumber(week[0]));
      return weeks;
    }, []);
  }
}
