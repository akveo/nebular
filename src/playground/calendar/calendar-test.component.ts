/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-test',
  template: `
    <nb-calendar [value]="date" (change)="onChange($event)"></nb-calendar>
    <br />
    <br />
    <br />
    <nb-calendar-range [value]="range" (change)="onChangeRange($event)"></nb-calendar-range>
  `,
})
export class NbCalendarTestComponent {
  date = null;
  range = null;

  onChange(date) {
    this.date = date;
  }

  onChangeRange(range) {
    this.range = range;
  }
}
