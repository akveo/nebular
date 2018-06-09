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
        <!--<nb-card>-->
          <!--<nb-card-header>-->
            <!--Calendar Demo-->
          <!--</nb-card-header>-->
          <!--<nb-card-body>-->
            <nb-calendar [value]="date" (change)="onChange($event)"></nb-calendar>
            <br/><br/><br/>
            <nb-calendar-range [value]="range" (change)="onChangeRange($event)"></nb-calendar-range>
          <!--</nb-card-body>-->
        <!--</nb-card>-->
      </nb-layout-column>
    </nb-layout>
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
