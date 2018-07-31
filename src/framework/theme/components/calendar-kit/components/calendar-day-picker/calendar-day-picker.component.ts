/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { NbCalendarDaysService } from '../../services';
import { NbCalendarMonthBuilderContext } from '../../model';
import { NbCalendarDayCellDirective } from '../calendar-cell';


@Component({
  selector: 'nb-calendar-day-picker',
  styleUrls: ['./calendar-day-picker.component.scss'],
  template: `
    <nb-calendar-days-names></nb-calendar-days-names>
    <div class="week" *ngFor="let week of weeks">
      <div [style.flex]="1" *ngFor="let day of week" (click)="onSelect(day)">
        <ng-container *ngIf="cell; else defaultCell">
          <ng-container
            [ngTemplateOutlet]="cell.template"
            [ngTemplateOutletContext]="createTemplateContext(day)">
          </ng-container>
        </ng-container>
        <ng-template #defaultCell>
          <nb-calendar-day-cell
            [date]="day"
            [activeMonth]="activeMonth"
            [selectedValue]="value">
          </nb-calendar-day-cell>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayPickerComponent<T> implements OnChanges {

  @Input() activeMonth: Date;

  @Input() value: T;

  @Input() boundingMonths: boolean = true;

  @Output() valueChange = new EventEmitter<Date>();

  @ContentChild(NbCalendarDayCellDirective) cell: NbCalendarDayCellDirective;

  weeks: Date[][];

  constructor(private daysService: NbCalendarDaysService<T>) {
  }

  ngOnChanges({ activeMonth }: SimpleChanges) {
    if (activeMonth) {
      this.invalidateModel();
    }
  }

  onSelect(day: Date) {
    if (day) {
      this.valueChange.emit(day);
    }
  }

  createTemplateContext(day: Date) {
    return {
      $implicit: {
        date: day,
        selectedValue: this.value,
        activeMonth: this.activeMonth,
      },
    }
  }

  private invalidateModel() {
    const context = this.createContext();
    this.weeks = this.daysService.createWeeks(context);
  }

  private createContext(): NbCalendarMonthBuilderContext<T> {
    return {
      activeMonth: this.activeMonth,
      selectedValue: this.value,
      includeBoundingMonths: this.boundingMonths,
    }
  }
}
