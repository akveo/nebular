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
    
    <nb-calendar [(date)]="date" [boundingMonth]="false">
      
      <span [style.min-width.px]="42" *nbCalendarDay="let date">
        {{ date.getDay() }}
      </span>

      <span [style.min-width.px]="42" *nbCalendarMonth="let date"> 
        {{ date.getMonth() }}
      </span>

      <span [style.min-width.px]="42" *nbCalendarYear="let date">
        {{ date.getFullYear()}}
      </span>

    </nb-calendar>
  `,
})
export class NbCalendarTestComponent {
  date;
}
