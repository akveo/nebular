import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import {
  NB_TIME_PICKER_CONFIG,
  NbSelectedTimeModel,
  NbSelectedTimePayload,
  NbTimePickerConfig,
  NbTimepickerTypes,
} from './model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NbPlatform } from '../cdk/platform/platform-service';

/**
 * The TimePicker components itself.
 * Provides a proxy to `TimePicker` options as well as custom picker options.
 */
@Component({
  selector: 'nb-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  exportAs: 'nbTimepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTimePickerComponent<D> implements OnChanges, OnInit {
  _isTwelveHoursFormat: boolean;
  _withSeconds: boolean;
  _singleColumn: boolean;
  _step: number;
  _timeFormat: string;
  fullTimeOptions: D[];
  hoursColumnOptions: string[];
  minutesColumnOptions: string[];
  secondsColumnOptions: string[];
  ampmColumnOptions: string[];
  readonly HOURS_IND_DAY: number = 12;
  fullTime: NbTimepickerTypes = NbTimepickerTypes.FULL_TIME;
  hour: NbTimepickerTypes = NbTimepickerTypes.HOUR;
  minute: NbTimepickerTypes = NbTimepickerTypes.MINUTE;
  sec: NbTimepickerTypes = NbTimepickerTypes.SECOND;
  ampm: NbTimepickerTypes = NbTimepickerTypes.AMPM;
  hostRef: ElementRef;

  /**
   * Defines time format string.
   * */
  get timeFormat(): string {
    return this._timeFormat;
  }

  set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
  }

  /**
   * Defines 12 hours format .
   * */
  @Input()
  get isTwelveHoursFormat(): boolean {
    return this._isTwelveHoursFormat;
  }

  set isTwelveHoursFormat(isTwelveHoursFormat: boolean) {
    this._isTwelveHoursFormat = isTwelveHoursFormat;
  };

  /**
   * Show seconds in timepicker.
   * Ignored when singleColumn is true
   * */
  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }

  set withSeconds(withSeconds: boolean) {
    this._withSeconds = withSeconds;
  };

  /**
   * Show timepicker values in one column with 60 minutes step by default.
   * */
  @Input()
  get singleColumn(): boolean {
    return this._singleColumn;
  }

  set singleColumn(singleColumn: boolean) {
    this._singleColumn = singleColumn;
  }

  /**
   * Defines minutes step when we use single column view.
   * If set to 20, it will be: '12:00, 12:20: 12:40, 13:00...'
   * */
  @Input()
  get step(): number {
    return this._step;
  }

  set step(step: number) {
    this._step = step;
  };

  /**
   * Date which will be rendered as selected.
   * */
  @Input()
  get date(): D {
    return this._date;
  }

  set date(date: D) {
    this._date = date;
    this.cd.markForCheck();
  }

  _date: D;

  /**
   * In timepicker value should be always true
   * In calendar-with-time.component  should set to false
   * @docs-private
   */
  @Input() showFooter: boolean = true;
  @Input() applyButtonText: string;
  @Input() currentTimeButtonText: string;

  /**
   * Emits date when selected.
   * */
  @Output() onSelectTime: EventEmitter<NbSelectedTimePayload<D>> = new EventEmitter<NbSelectedTimePayload<D>>();
  @ViewChild(NbPortalDirective, {static: true}) portal: NbPortalDirective;

  constructor(@Inject(NB_TIME_PICKER_CONFIG) config: NbTimePickerConfig,
              protected platformService: NbPlatform,
              @Inject(LOCALE_ID) locale: string,
              protected cd: ChangeDetectorRef,
              protected calendarTimeModelService: NbCalendarTimeModelService<D>,
              protected dateService: NbDateService<D>) {
    if (config) {
      this.isTwelveHoursFormat = config.isTwelveHoursFormat;
    } else {
      this.isTwelveHoursFormat = dateService.getLocaleTimeFormat().includes('h');
    }
  }

  ngOnInit(): void {
    this.timeFormat = this.buildTimeFormat();
    this.buildColumnOptions();
  }

  ngOnChanges({
                step,
                isTwelveHoursFormat,
                withSeconds,
                singleColumn,
              }: SimpleChanges): void {
    this.timeFormat = this.buildTimeFormat();
    if (step || isTwelveHoursFormat || withSeconds || singleColumn) {
      this.buildColumnOptions();
    }
  }

  setHost(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  setCurrentTime() {
    this.date = this.dateService.today();
    this.onSelectTime.emit({
      time: this.date,
      format: this.timeFormat,
      twelveHourFormat: this.isTwelveHoursFormat,
      save: true,
    });
  }

  select({value, type}: NbSelectedTimeModel) {
    let newTime: D;
    const val = parseInt(value, 10);
    switch (type) {
      case NbTimepickerTypes.HOUR:
        const hour: number = this.isTwelveHoursFormat &&
        this.dateService.getHour(this.date) > this.HOURS_IND_DAY ? val + this.HOURS_IND_DAY : val;
        newTime = this.dateService.setHour(this.date, hour);
        break;
      case NbTimepickerTypes.MINUTE:
        newTime = this.dateService.setMinute(this.date, val);
        break;
      case NbTimepickerTypes.SECOND:
        newTime = this.dateService.setSecond(this.date, val);
        break;
    }
    this.updateValue(newTime);
  }

  selectFullTime(value: D): void {
    this.updateValue(value);
  }

  changeAMPM({value}: NbSelectedTimeModel) {
    const currentDateAMPM: string = this.calendarTimeModelService.getAmPm(this.date);

    if (currentDateAMPM === value) {
      return;
    }

    const increment = (currentDateAMPM === this.calendarTimeModelService.PM ? -1 : 1) * this.HOURS_IND_DAY;

    this.updateValue(this.dateService.addHour(this.date, increment));
  }

  updateValue(date: D) {
    this.onSelectTime.emit({time: date, twelveHourFormat: this.isTwelveHoursFormat, format: this.timeFormat});
  }

  saveValue() {
    this.onSelectTime.emit({
      time: this.date,
      twelveHourFormat: this.isTwelveHoursFormat,
      format: this.timeFormat,
      save: true,
    });
  }

  trackByTimeValues(index, value) {
    return value;
  }

  showSeconds(): boolean {
    return this.withSeconds && !this.singleColumn;
  }

  isSelectedTimeValue(value: string, type: string) {
    const item: number = parseInt(value, 10);
    switch (type) {
      case NbTimepickerTypes.HOUR:
        const hour: number = this.dateService.getHour(this.date);
        const selectedHour: number = this.isTwelveHoursFormat && hour > this.HOURS_IND_DAY ?
          hour - this.HOURS_IND_DAY : hour;

        return (item === selectedHour) ||
          (selectedHour === 0 && item === this.HOURS_IND_DAY && this.isTwelveHoursFormat);
      case NbTimepickerTypes.MINUTE:
        const minute: number = this.dateService.getMinute(this.date);

        return item === minute;
      case NbTimepickerTypes.SECOND:
        const second: number = this.dateService.getSecond(this.date);

        return item === second;
      case NbTimepickerTypes.AMPM:
        if (value === this.calendarTimeModelService.PM) {
          return this.dateService.getHour(this.date) > this.HOURS_IND_DAY;
        } else {
          return this.dateService.getHour(this.date) <= this.HOURS_IND_DAY;
        }
    }
  }

  getFullTimeString(item: D): string {
    return this.dateService.format(item, this.timeFormat).toUpperCase()
  }

  isSelectedFullTimeValue(value: D): boolean {
    return this.dateService.isEqualTime(value, this.date, false);
  }

  buildTimeFormat(): string {
    if (this.isTwelveHoursFormat) {
      return `${this.withSeconds && !this.singleColumn ? this.calendarTimeModelService.twelveTimeFormatWithSeconds
        : this.calendarTimeModelService.twelveHoursTimeFormat}`;
    } else {
      return `${this.withSeconds && !this.singleColumn ? this.calendarTimeModelService.timeFormatWithSeconds
        : this.calendarTimeModelService.timeFormat}`;
    }
  }

  buildColumnOptions(): void {
    this.timeFormat = this.buildTimeFormat();
    this.fullTimeOptions = this.singleColumn ?
      this.calendarTimeModelService.getFullHours(this.isTwelveHoursFormat, this.step) : [];
    this.hoursColumnOptions = this.calendarTimeModelService.getHoursInDay(this.isTwelveHoursFormat);
    this.minutesColumnOptions = this.calendarTimeModelService.getMinutesAndSeconds();
    this.secondsColumnOptions = this.withSeconds ? this.calendarTimeModelService.getMinutesAndSeconds() : [];
    this.ampmColumnOptions = this.isTwelveHoursFormat ? this.calendarTimeModelService.AMPM : [];
  }

  isFirefox(): boolean {
    return this.platformService.FIREFOX;
  }
}
