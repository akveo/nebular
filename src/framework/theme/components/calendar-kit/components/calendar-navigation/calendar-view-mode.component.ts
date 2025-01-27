/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TranslationWidth } from '@angular/common';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarViewMode, NbCalendarViewModeValues } from '../../model';
import { NbCalendarYearModelService } from '../../services/calendar-year-model.service';
import { NbDateService } from '../../services/date.service';

@Component({
  selector: 'nb-calendar-view-mode',
  template: `
    <button nbButton (click)="changeMode.emit()" ghost status="basic">
      {{ getText() }}
      <nb-icon [icon]="getIcon()" pack="nebular-essentials"></nb-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbCalendarViewModeComponent<D> {
  @Input() date: D;
  @Input() viewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;
  static ngAcceptInputType_viewMode: NbCalendarViewModeValues;
  @Output() changeMode = new EventEmitter<void>(true);

  constructor(protected dateService: NbDateService<D>, protected yearModelService: NbCalendarYearModelService<D>) {}

  getText(): string {
    if (!this.date) {
      return '';
    }

    switch (this.viewMode) {
      case NbCalendarViewMode.DATE: {
        const month = this.dateService.getMonthName(this.date, TranslationWidth.Wide);
        const year = this.dateService.getYear(this.date);
        return `${month} ${year}`;
      }
      case NbCalendarViewMode.MONTH:
        return `${this.dateService.getYear(this.date)}`;
      case NbCalendarViewMode.YEAR:
        return `${this.getFirstYear()} - ${this.getLastYear()}`;
    }
  }

  getIcon(): string {
    if (this.viewMode === NbCalendarViewMode.DATE) {
      return 'chevron-down-outline';
    }

    return 'chevron-up-outline';
  }

  protected getFirstYear(): string {
    const years = this.yearModelService.getViewYears(this.date);
    return this.dateService.getYear(years[0][0]).toString();
  }

  protected getLastYear(): string {
    const years = this.yearModelService.getViewYears(this.date);
    const lastRow = years[years.length - 1];
    const lastYear = lastRow[lastRow.length - 1];

    return this.dateService.getYear(lastYear).toString();
  }
}
