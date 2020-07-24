import { Component, Input, OnInit } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbSelectedTimePayload } from '../timepicker/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';

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
             [class.timepicker-single-column-width]="singleColumn"
             [class.timepicker-multiple-column-width]="!singleColumn">
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            #timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="date"
            [isTwelveHoursFormat]="isTwelveHoursFormat"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [singleColumn]="singleColumn"
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
   * Defines selected date.
   * */
  @Input() visibleDate: D;

  /**
   * Defines 12 hours format like '07:00 PM'.
   * */
  @Input() isTwelveHoursFormat: boolean;

  /**
   * Show seconds in timepicker.
   * Ignored when singleColumn is true.
   * */
  @Input() withSeconds: boolean;

  /**
   * Show timepicker values in one column with 60 minutes step by default.
   * */
  @Input() singleColumn: boolean;

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

  constructor(protected dateService: NbDateService<D>,
              protected calendarTimeModelService: NbCalendarTimeModelService<D>,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.date) {
      this.date = this.dateService.today();

      this.date = this.dateService.setHours(this.date, 0);
      this.date = this.dateService.setMinutes(this.date, 0);
      this.date = this.dateService.setSeconds(this.date, 0);
    }
  }

  onDateValueChange(date: D): void {
    const hours = this.dateService.getHours(this.date);
    const minutes = this.dateService.getMinutes(this.date);
    const seconds = this.dateService.getSeconds(this.date);

    let newDate = this.dateService.setHours(date, hours);
    newDate = this.dateService.setMinutes(newDate, minutes);
    newDate = this.dateService.setMinutes(newDate, minutes);
    newDate = this.dateService.setSeconds(newDate, seconds);

    this.date = newDate;
  }

  onTimeChange(selectedTime: NbSelectedTimePayload<D>): void {
    this.date = selectedTime.time;
  }

  saveValue(): void {
    this.dateChange.emit(this.date);
  }

  saveCurrentTime(): void {
    this.dateChange.emit(this.dateService.today());
  }

  /**
   * We don't show seconds with twelve hours format
   * */
  showSeconds(): boolean {
    return this.withSeconds && !this.isTwelveHoursFormat;
  }
}
