/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { NbDateService } from '../../services/date.service';
import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-year-cell',
  template: `{{ year }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'year-cell' },
})
export class NbCalendarYearCellComponent<D> implements NbCalendarCell<D, D> {
  @Input() date: D;

  @Input() min: D;

  @Input() max: D;

  @Input() selectedValue: D;

  @Output() select: EventEmitter<D> = new EventEmitter(true);

  constructor(protected dateService: NbDateService<D>) {
  }

  @HostBinding('class.selected') get selected(): boolean {
    return this.dateService.isSameYearSafe(this.date, this.selectedValue);
  }

  @HostBinding('class.today') get today(): boolean {
    return this.dateService.isSameYearSafe(this.date, this.dateService.today());
  }

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.smallerThanMin() || this.greaterThanMax();
  }

  get year(): number {
    return this.dateService.getYear(this.date);
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.date);
  }

  private smallerThanMin(): boolean {
    return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
  }

  private greaterThanMax(): boolean {
    return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
  }

  private yearStart(): D {
    return this.dateService.getYearStart(this.date);
  }

  private yearEnd(): D {
    return this.dateService.getYearEnd(this.date);
  }
}
