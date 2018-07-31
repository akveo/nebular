/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbCalendarRange } from '@nebular/theme';

@Component({
  selector: 'nb-calendar-test',
  template: `
    Selected range: {{ range.start | date }} - {{ range.end | date }}
    <br/>
    <br/>
    <nb-calendar-range [(range)]="range"></nb-calendar-range>
  `,
})
export class NbCalendarRangeTestComponent {
  range: NbCalendarRange = { start: null, end: null };
}
