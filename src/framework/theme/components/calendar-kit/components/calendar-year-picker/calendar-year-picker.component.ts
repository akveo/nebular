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
} from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarYearCellDirective } from '../calendar-cell';


// TODO i don't think we need defaults
const defaultYearCount = 20;

@Component({
  selector: 'nb-calendar-year-picker',
  styleUrls: ['./calendar-year-picker.component.scss'],
  template: `
    <div class="chunk-row" *ngFor="let yearRow of years">
      <div *ngFor="let year of yearRow" (click)="onClick(year)">
        <ng-container *ngIf="cell; else defaultCell">
          <ng-container
            [ngTemplateOutlet]="cell.template"
            [ngTemplateOutletContext]="createTemplateContext(year)">
          </ng-container>
        </ng-container>
        <ng-template #defaultCell>
          <nb-calendar-year-cell
            [date]="year"
            [selectedValue]="value">
          </nb-calendar-year-cell>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent implements OnChanges {

  @Input() value: Date;

  @Output() valueChange = new EventEmitter<any>();

  @ContentChild(NbCalendarYearCellDirective) cell: NbCalendarYearCellDirective;

  years: Date[][];

  ngOnChanges() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.value.getFullYear();
    const startYear = Math.ceil(selectedYear - defaultYearCount / 2);
    const years = range(defaultYearCount).map(i => this.createYearDateByIndex(i + startYear));
    this.years = batch(years, 4);
  }

  onClick(year) {
    this.value = year;
    this.valueChange.emit(year);
  }

  createTemplateContext(year: Date) {
    return {
      $implicit: year,
      selectedValue: this.value,
    }
  }

  private createYearDateByIndex(i: number): Date {
    return new Date(i, this.value.getMonth(), this.value.getDate());
  }
}
