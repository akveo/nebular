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
    <div class="sign">{{ weekNumberSymbol }}</div>
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

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

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
    return this.weeks.map((week: D[]) => {
      // Find last defined day as week could contain null days in case
      // boundingMonth set to false
      const lastDay = [ ...week ].reverse().find((day: D) => !!day);
      // Use last day of the week to determine week number.
      // This way weeks which span between sibling years is marked first
      return this.dateService.getWeekNumber(lastDay);
    });
  }
}
