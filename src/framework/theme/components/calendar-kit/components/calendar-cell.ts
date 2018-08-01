import { EventEmitter } from '@angular/core';


export interface NbCalendarCell<T> {
  date: Date;
  select: EventEmitter<Date>;
  selectedValue?: T;
  activeMonth?: Date;
  min?: Date;
  max?: Date;
  filter?: (Date) => boolean;
}
