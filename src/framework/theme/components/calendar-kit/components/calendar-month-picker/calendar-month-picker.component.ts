/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarMonthCellDirective } from '../calendar-cell';


@Component({
  selector: 'nb-calendar-month-picker',
  styleUrls: ['./calendar-month-picker.component.scss'],
  template: `
    <div class="chunk-row" *ngFor="let monthRow of months">
      <div *ngFor="let month of monthRow" (click)="onClick(month)">
        <ng-container *ngIf="cell; else defaultCell">
          <ng-container
            [ngTemplateOutlet]="cell.template"
            [ngTemplateOutletContext]="createTemplateContext(month)">
          </ng-container>
        </ng-container>
        <ng-template #defaultCell>
          <nb-calendar-month-cell
            [date]="month"
            [selectedValue]="value">
          </nb-calendar-month-cell>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarMonthPickerComponent implements OnInit {

  @Input() value: Date;

  @Output() valueChange = new EventEmitter<Date>();

  months: Date[][];

  @ContentChild(NbCalendarMonthCellDirective) cell: NbCalendarMonthCellDirective;

  ngOnInit() {
    this.initMonths();
  }

  initMonths() {
    const months: Date[] = range(12).map(i => this.createMonthDateByIndex(i));
    this.months = batch(months, 4);
  }

  onClick(month) {
    this.value = month;
    this.valueChange.emit(this.value);
  }

  createTemplateContext(day: Date) {
    return {
      $implicit: day,
      selectedValue: this.value,
    }
  }

  private createMonthDateByIndex(i: number): Date {
    return new Date(this.value.getFullYear(), i, this.value.getDate());
  }
}
