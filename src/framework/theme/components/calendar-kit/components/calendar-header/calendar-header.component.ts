/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'nb-calendar-header',
  template: `
    <div class="header">
      <span class="title" (click)="navigateToday.emit()">
        {{ date | nbCalendarDate }} <i class="nb-arrow-dropright"></i>
      </span>
      <span class="sub-title">Today</span>
    </div>
  `,
})
export class NbCalendarHeaderComponent {
  @Input() date: Date = new Date();
  @Output() navigateToday: EventEmitter<void> = new EventEmitter();
}
