/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-calendar-test',
  template: `
    Selected date: {{ date | date }}
    <br/>
    <br/>
    <nb-calendar [(date)]="date" [boundingMonth]="false"></nb-calendar>
  `,
})
export class NbCalendarTestComponent {
  date;
}
