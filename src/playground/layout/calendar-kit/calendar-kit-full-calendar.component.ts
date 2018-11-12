import { Component, EventEmitter } from '@angular/core';
import { TranslationWidth } from '@angular/common';

import {
  NbCalendarCell,
  NbCalendarDayPickerComponent,
  NbCalendarMonthModelService,
  NbDateService,
} from '@nebular/theme';


@Component({
  selector: 'nb-calendar-kit-month-cell',
  styles: [` :host { padding: 1rem; } `],
  template: `
    <h4>{{ title }}</h4>
    <nb-calendar-day-picker
      [boundingMonths]="false"
      [visibleDate]="date"
      [date]="selectedValue"
      (dateChange)="select.emit($event)">
    </nb-calendar-day-picker>
  `,
})
export class NbCalendarKitMonthCellComponent extends NbCalendarDayPickerComponent<Date, Date>
  implements NbCalendarCell<Date, Date> {
  select: EventEmitter<Date> = new EventEmitter();
  selectedValue: Date;

  constructor(private dateService: NbDateService<Date>, monthModel: NbCalendarMonthModelService<Date>) {
    super(monthModel);
  }

  get title() {
    return this.dateService.getMonthName(this.date, TranslationWidth.Wide);
  }
}

@Component({
  selector: 'nb-calendar-kit-full-calendar-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-month-picker
          [(month)]="month"
          [cellComponent]="monthCellComponent"
        ></nb-calendar-month-picker>
      </nb-card-body>
    </nb-card>
  `,
  entryComponents: [NbCalendarKitMonthCellComponent],
})
export class NbCalendarKitFullCalendarShowcaseComponent {
  month = new Date();
  monthCellComponent = NbCalendarKitMonthCellComponent;
}
