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
  `,
})
export class NbCalendarTestComponent {
  date = new Date();
  
  onChange(date) {
    this.date = date;
  }
}
