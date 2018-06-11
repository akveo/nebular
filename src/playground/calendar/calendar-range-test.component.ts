/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-range-test',
  template: `
    <nb-calendar-range [value]="date" (change)="onChange($event)"></nb-calendar-range>
  `,
})
export class NbCalendarRangeTestComponent {
  date = null;

  onChange(date) {
    this.date = date;
  }
}
