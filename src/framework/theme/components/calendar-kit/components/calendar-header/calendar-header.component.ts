/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';


@Component({
  selector: 'nb-calendar-header',
  template: `
    <h5>{{ date | nbCalendarDate }}</h5>
    <span>Today</span>
  `,
})
export class NbCalendarHeaderComponent {
  @Input() date: Date = new Date();
}
