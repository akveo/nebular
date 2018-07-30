/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbBaseCalendar } from './base-calendar';


@Component({
  selector: 'nb-calendar',
  templateUrl: './calendar.component.html',
})
export class NbCalendarComponent extends NbBaseCalendar<Date> {
  @Output() dateChange = new EventEmitter<Date>();

  @Input()
  set date(date: Date) {
    this.value = date;
  }

  protected onChange(date: Date) {
    this.date = date;
    this.dateChange.emit(date);
  }
}
