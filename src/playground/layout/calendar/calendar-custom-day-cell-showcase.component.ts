/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbCalendarDayCellComponent } from '@nebular/theme';


@Component({
  selector: 'nb-calendar-custom-day-cell',
  styles: [`
    :host { text-align: center; }
    span { font-size: 75%; opacity: 0.75; }
  `],
  template: `
    <div>
      <div>{{ day }}</div>
      <span>{{ (day + 100) * day }}$</span>
    </div>
  `,
  host: { '(click)': 'onClick()', 'class': 'day-cell' },
})
export class NbCalendarCustomDayCellComponent extends NbCalendarDayCellComponent<Date> {
}

@Component({
  selector: 'nb-calendar-custom-day-cell-showcase',
  template: `
    <h1>Selected date: {{ date | date }}</h1>
    <nb-calendar
      [(date)]="date"
      [dayCellComponent]="dayCellComponent"
      size="large"
    ></nb-calendar>
  `,
  entryComponents: [NbCalendarCustomDayCellComponent],
})
export class NbCalendarCustomDayCellShowcaseComponent {
  date = new Date();
  dayCellComponent = NbCalendarCustomDayCellComponent;
}
