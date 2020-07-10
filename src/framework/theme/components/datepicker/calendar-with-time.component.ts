import { Component, Input, OnInit } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbSelectedTimePayload } from '../timepicker/model';
import { NbDateService } from '../calendar-kit/services/date.service';

export interface NbCalendarWithTime {
  isTwelveHoursFormat: boolean;
  withSeconds: boolean;
}

@Component({
  selector: 'nb-calendar-with-time',
  template: `
    <nb-card class="calendar-with-time">
      <nb-card-body class="picker-body">
        <nb-base-calendar
          [boundingMonth]="boundingMonth"
          [startView]="startView"
          [date]="date"
          [min]="min"
          [max]="max"
          [filter]="filter"
          [dayCellComponent]="dayCellComponent"
          [monthCellComponent]="monthCellComponent"
          [yearCellComponent]="yearCellComponent"
          [size]="size"
          [visibleDate]="visibleDate"
          [showNavigation]="showNavigation"
          [showWeekNumber]="showWeekNumber"
          [weekNumberSymbol]="weekNumberSymbol"
          (dateChange)="onDateValueChange($event)">
        </nb-base-calendar>
        <div class="timepicker-section"
             [class.timepicker-single-column-width]="useFullTimeFormat"
             [class.timepicker-multiple-column-width]="!useFullTimeFormat">
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            #timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="time"
            [isTwelveHoursFormat]="isTwelveHoursFormat"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [useFullTimeFormat]="useFullTimeFormat"
            [step]="step">
          </nb-timepicker>
          <ng-container [ngTemplateOutlet]="timepicker.portal.templateRef"></ng-container>
        </div>
      </nb-card-body>
      <nb-card-footer class="picker-footer">
        <nb-calendar-actions
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./calendar-with-time-container.component.scss'],
})
export class NbCalendarWithTimeComponent<D> extends NbCalendarComponent<D> implements OnInit {
  @Input() isTwelveHoursFormat: boolean;
  @Input() withSeconds: boolean;
  @Input() useFullTimeFormat: boolean;
  @Input() step: number;
  @Input() timeFormat: string;
  @Input() title: string;
  @Input() set visibleDate(date: D) {
    if (date) {
      this._visibleDate = date;
      this.time = date;
    }
  };
  get visibleDate(): D {
    return this._visibleDate;
  }

  set time(time: D) {
    this._time = time;
  };

  get time(): D {
    return this._time;
  }

  constructor(protected dateService: NbDateService<D>) {
    super();
  }

  _time: D;
  _visibleDate: D;

  ngOnInit(): void {
    this.date = this.dateService.today();

    let today = this.dateService.today();
    today = this.dateService.setHour(today, 0);
    today = this.dateService.setMinute(today, 0);
    today = this.dateService.setSecond(today, 0);

    this.time = today;
  }

  onDateValueChange(date: any): void {
    this.date = date;
  }

  onTimeChange(selectedTime: NbSelectedTimePayload<D>): void {
    this.time = selectedTime.time;
  }

  saveValue(): void {
    this.dateChange.emit(this.buildDateValue());
  }

  saveCurrentTime(): void {
    this.dateChange.emit(this.dateService.today());
  }

  buildDateValue(): D {
    const date: string = `${this.dateService.getYear(this.date)}-${this.dateService.getMonth(this.date) + 1}-` +
      `${this.dateService.getDate(this.date)}`;
    const time: string = this.dateService.format(this.time, this.timeFormat);

    return this.dateService.parse(`${date} ${time}`, `yyyy-MM-dd ${this.timeFormat}`);
  }

  /**
   * We not show seconds with twelve hours format
   * */
  showSeconds(): boolean {
    return this.withSeconds && !this.isTwelveHoursFormat;
  }
}
