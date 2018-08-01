import { EventEmitter } from '@angular/core';


export interface NbCalendarCell<T> {
  date: Date;
  selectedValue: T;
  activeMonth?: Date;
  select: EventEmitter<Date>;
}
