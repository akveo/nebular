import { Component, Input, OnInit } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbSelectedTimeModel, NbSelectedTimePayload } from '../timepicker/model';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';

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
          [visibleDate]="_visibleDate"
          [showNavigation]="showNavigation"
          [showWeekNumber]="showWeekNumber"
          [weekNumberSymbol]="weekNumberSymbol"
          (dateChange)="onDateValueChange($event)">
        </nb-base-calendar>
        <div class="timepicker-section" [ngClass]="{
         'timepicker-single-column-width' : useFullTimeFormat,
         'timepicker-multiple-column-width' : !useFullTimeFormat}">
          <div class="picker-title">{{'Title'}}</div>
          <nb-timepicker
            #timepicker
            (onSelectTime)="onTimeChange($event)"
            [selectedTime]="activeTime"
            [isTwelveHoursFormat]="isTwelveHoursFormat"
            [withSeconds]="this.withSeconds && !this.isTwelveHoursFormat"
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
export class NbCalendarWithTimeComponent<D> extends NbCalendarComponent<Date> implements OnInit {
  @Input() isTwelveHoursFormat: boolean;
  @Input() withSeconds: boolean;
  @Input() useFullTimeFormat: boolean;
  @Input() step: number;
  @Input() timeFormat: string;
  @Input() set visibleDate(date: Date) {
    if (date) {
      this._visibleDate = date;
      if (this.useFullTimeFormat) {
        const hours: number = this.isTwelveHoursFormat ? date.getHours() % 12 : date.getHours();

        this.activeTime = {
          fullTime: `${this.nbCalendarTimeModelService.formatToString(hours)}` +
          `:${this.nbCalendarTimeModelService.formatToString(date.getMinutes())}${this.isTwelveHoursFormat ?
            ' ' + this.nbCalendarTimeModelService.getAmPm(date, this.timeFormat) : ''}`,
        }
      } else {
        this.activeTime = {
          hour: this.isTwelveHoursFormat ?
            this.nbCalendarTimeModelService.formatToString(date.getHours() % this.HOURS_IN_DAY_ALT) :
            this.nbCalendarTimeModelService.formatToString(date.getHours()),
          minute: this.nbCalendarTimeModelService.formatToString(date.getMinutes()),
          sec: this.nbCalendarTimeModelService.formatToString(date.getSeconds()),
          ampm: this.isTwelveHoursFormat ? this.nbCalendarTimeModelService.getAmPm(date, this.timeFormat) : '',
          fullTime: this.nbCalendarTimeModelService.getFormattedTime(date, this.timeFormat),
        };
      }
    }
  };

  constructor(protected nbCalendarTimeModelService: NbCalendarTimeModelService) {
    super();
  }

  activeTime: NbSelectedTimeModel;
  _visibleDate: Date;

  readonly HOURS_IN_DAY_ALT: number = 12;

  ngOnInit(): void {
    this.date = new Date();
    this.activeTime = {
      hour: '00',
      minute: '00',
      sec: '00',
      ampm: 'AM',
      fullTime: '',
    };
  }

  onDateValueChange(date: any): void {
    this.date = date;
  }

  onTimeChange(payload: NbSelectedTimePayload): void {
    this.activeTime = payload.time;
  }

  saveValue(): void {
    this.dateChange.emit(this.buildDateValue());
  }

  saveCurrentTime(): void {
    this.dateChange.emit(new Date());
  }

  buildDateValue(): Date {
    const date: string = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-` +
    `${this.date.getDate()}`;

    const hour: string = this.isTwelveHoursFormat ?
      (parseInt(this.activeTime.hour, 10) % 12).toString() : this.activeTime.hour;

    const time = this.useFullTimeFormat ? this.activeTime.fullTime :
      `${hour}:${this.activeTime.minute}${this.withSeconds && !this.isTwelveHoursFormat ?
      `:${this.activeTime.sec}` : ''} ${this.isTwelveHoursFormat ? this.activeTime.ampm : ''}`;
    return new Date(`${date} ${time}`);
  }
}
