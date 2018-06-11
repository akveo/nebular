/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <div style="display: flex">
          <nb-calendar [value]="date" (change)="onChange($event)"></nb-calendar>
          <nb-calendar-range [value]="range" (change)="onChangeRange($event)"></nb-calendar-range>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [`
    nb-calendar {
      margin-right: 2rem;
    }
  `]
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
