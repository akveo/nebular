/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewContainerRef,
} from '@angular/core';

import { NbCalendarCellStatusService, NbCalendarDaysService } from '../../services';
import { NbCalendarCell, NbCalendarMonthBuilderContext } from '../../model';
import { NbCalendarCellDirective } from '@nebular/theme/components/calendar-kit/components/calendar-cell-def';


@Component({
  selector: 'nb-calendar-day-picker',
  styleUrls: ['./calendar-day-picker.component.scss'],
  template: `
    <nb-calendar-days-names></nb-calendar-days-names>
    <div class="week" *ngFor="let week of weeks">
      <span *ngFor="let cell of week" (click)="onSelect(cell)">
        <ng-container *ngIf="cellDef; else defaultCell">
          <ng-container *ngTemplateOutlet="cellDef.template; context: {$implicit: cell}"></ng-container>
        </ng-container>
        <ng-template #defaultCell>
          <nb-calendar-cell [cell]="cell"></nb-calendar-cell>
        </ng-template>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDayPickerComponent<T> implements OnChanges {

  @Input() activeMonth: Date;

  @Input() value: T;

  @Input() boundingMonths: boolean = true;

  @Output() valueChange = new EventEmitter<Date>();

  @ContentChild(NbCalendarCellDirective) cellDef: NbCalendarCellDirective;
  weeks: NbCalendarCell[][];

  constructor(private daysService: NbCalendarDaysService<T>,
              private cellStateService: NbCalendarCellStatusService<T>) {
  }

  ngOnChanges() {
    if (this.activeMonth) {
      this.invalidateModel();
    }
  }

  onSelect(cell: NbCalendarCell) {
    this.valueChange.emit(cell.date);
  }

  private invalidateModel() {
    const context = this.createContext();
    const days: Date[][] = this.daysService.createWeeks(context);
    this.weeks = days.map(week => week.map((date: Date) => this.createCellWithState(date, context)));
  }

  private createCellWithState(date: Date, context: NbCalendarMonthBuilderContext<T>): NbCalendarCell {
    const cell = { date, status: [] };
    this.cellStateService.assignStates(cell, context);
    return cell;
  }

  private createContext(): NbCalendarMonthBuilderContext<T> {
    return {
      activeMonth: this.activeMonth,
      selectedValue: this.value,
      includeBoundingMonths: this.boundingMonths,
    }
  }
}
