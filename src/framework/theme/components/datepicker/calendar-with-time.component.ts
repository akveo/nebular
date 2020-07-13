import { Component, Input, OnInit } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbSelectedTimePayload } from '../timepicker/model';
import { NbDateService } from '../calendar-kit/services/date.service';

export interface NbCalendarWithTime {
  isTwelveHoursFormat: boolean;
  withSeconds: boolean;
}
/**
 * Calendar with time component.
 *
 * ```html
 * <input nbInput placeholder="Pick Date" [nbDatepicker]="formpicker">
 * <nb-date-timepicker #formpicker</nb-date-timepicker>
 * ```
 *
 * Basic usage example
 * @stacked-example(Showcase, calendar/date-timepicker-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCalendarModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbDatepickerModule.forRoot(),
 *     NbTimepickerModule.forRoot(),
 *   ],
 * })
 * export class DatepickerModule { }
 * @styles
 *
 * timepicker-color:
 * timepicker-hover-background-color:
 * timepicker-hover-color:
 * timepicker-focus-background-color:
 * timepicker-focus-color:
 * timepicker-active-background-color:
 * timepicker-active-color:
 * timepicker-cell-text-font-size:
 * timepicker-cell-text-font-weight:
 * timepicker-basic-color:
 * timepicker-border-color:
 * timepicker-border-style:
 * timepicker-border-width:
 * calendar-width:
 * calendar-background-color:
 * calendar-border-color:
 * calendar-border-style:
 * calendar-border-width:
 * calendar-border-radius:
 * calendar-text-color:
 * calendar-text-font-family:
 * calendar-text-font-size:
 * calendar-text-font-weight:
 * calendar-text-line-height:
 * calendar-picker-padding-top:
 * calendar-picker-padding-bottom:
 * calendar-picker-padding-start:
 * calendar-picker-padding-end:
 * calendar-navigation-text-color:
 * calendar-navigation-text-font-family:
 * calendar-navigation-title-text-font-size:
 * calendar-navigation-title-text-font-weight:
 * calendar-navigation-title-text-line-height:
 * calendar-navigation-padding:
 * calendar-cell-inactive-text-color:
 * calendar-cell-disabled-text-color:
 * calendar-cell-hover-background-color:
 * calendar-cell-hover-border-color:
 * calendar-cell-hover-text-color:
 * calendar-cell-hover-text-font-size:
 * calendar-cell-hover-text-font-weight:
 * calendar-cell-hover-text-line-height:
 * calendar-cell-active-background-color:
 * calendar-cell-active-border-color:
 * calendar-cell-active-text-color:
 * calendar-cell-active-text-font-size:
 * calendar-cell-active-text-font-weight:
 * calendar-cell-active-text-line-height:
 * calendar-cell-today-background-color:
 * calendar-cell-today-border-color:
 * calendar-cell-today-text-color:
 * calendar-cell-today-text-font-size:
 * calendar-cell-today-text-font-weight:
 * calendar-cell-today-text-line-height:
 * calendar-cell-today-hover-background-color:
 * calendar-cell-today-hover-border-color:
 * calendar-cell-today-active-background-color:
 * calendar-cell-today-active-border-color:
 * calendar-cell-today-disabled-border-color:
 * calendar-cell-today-selected-background-color:
 * calendar-cell-today-selected-border-color:
 * calendar-cell-today-selected-text-color:
 * calendar-cell-today-selected-hover-background-color:
 * calendar-cell-today-selected-hover-border-color:
 * calendar-cell-today-selected-active-background-color:
 * calendar-cell-today-selected-active-border-color:
 * calendar-cell-today-in-range-background-color:
 * calendar-cell-today-in-range-border-color:
 * calendar-cell-today-in-range-text-color:
 * calendar-cell-today-in-range-hover-background-color:
 * calendar-cell-today-in-range-hover-border-color:
 * calendar-cell-today-in-range-active-background-color:
 * calendar-cell-today-in-range-active-border-color:
 * calendar-cell-selected-background-color:
 * calendar-cell-selected-border-color:
 * calendar-cell-selected-text-color:
 * calendar-cell-selected-text-font-size:
 * calendar-cell-selected-text-font-weight:
 * calendar-cell-selected-text-line-height:
 * calendar-cell-selected-hover-background-color:
 * calendar-cell-selected-hover-border-color:
 * calendar-cell-selected-active-background-color:
 * calendar-cell-selected-active-border-color:
 * calendar-day-cell-width:
 * calendar-day-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-weekday-background:
 * calendar-weekday-divider-color:
 * calendar-weekday-divider-width:
 * calendar-weekday-text-color:
 * calendar-weekday-text-font-size:
 * calendar-weekday-text-font-weight:
 * calendar-weekday-text-line-height:
 * calendar-weekday-holiday-text-color:
 * calendar-weekday-height:
 * calendar-weekday-width:
 * calendar-weeknumber-background:
 * calendar-weeknumber-divider-color:
 * calendar-weeknumber-divider-width:
 * calendar-weeknumber-text-color:
 * calendar-weeknumber-text-font-size:
 * calendar-weeknumber-text-font-weight:
 * calendar-weeknumber-text-line-height:
 * calendar-weeknumber-height:
 * calendar-weeknumber-width:
 * calendar-large-width:
 * calendar-day-cell-large-width:
 * calendar-day-cell-large-height:
 * calendar-weekday-large-height:
 * calendar-weekday-large-width:
 * calendar-weeknumber-large-height:
 * calendar-weeknumber-large-width:
 * calendar-month-cell-large-width:
 * calendar-month-cell-large-height:
 * calendar-year-cell-large-width:
 * calendar-year-cell-large-height:
 * */
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
          [applyButtonText]="applyButtonText"
          [currentTimeButtonText]="currentTimeButtonText"
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./calendar-with-time-container.component.scss'],
})
export class NbCalendarWithTimeComponent<D> extends NbCalendarComponent<D> implements OnInit {
  /**
   * Defines 12 hours format like '07:00 PM'.
   * */
  @Input() isTwelveHoursFormat: boolean;

  /**
   * Show seconds in timepicker.
   * Ignored when useFullTimeFormat is true.
   * */
  @Input() withSeconds: boolean;

  /**
   * Show timepicker values in one column with 60 minutes step by default.
   * */
  @Input() useFullTimeFormat: boolean;

  /**
   * Defines minutes step when we use fill time format.
   * If set to 20, it will be: '12:00, 12:20: 12:40, 13:00...'
   * */
  @Input() step: number;

  /**
   * Defines time format.
   * */
  @Input() timeFormat: string;

  /**
   * Defines text over the timepicker.
   * */
  @Input() title: string;


  @Input() applyButtonText: string;

  @Input() currentTimeButtonText: string;

  /**
   * Defines selected date.
   * */
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
