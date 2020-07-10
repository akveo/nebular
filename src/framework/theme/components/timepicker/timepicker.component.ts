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

@Component({
  selector: 'nb-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  exportAs: 'nbTimepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTimePickerComponent<D> implements OnChanges {
  @Input()
  get isTwelveHoursFormat(): boolean {
    return this._isTwelveHoursFormat;
  }

  set isTwelveHoursFormat(isTwelveHoursFormat: boolean) {
    this._isTwelveHoursFormat = isTwelveHoursFormat;
  };

  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }

  set withSeconds(withSeconds: boolean) {
    this._withSeconds = withSeconds;
  };

  @Input()
  get useFullTimeFormat(): boolean {
    return this._useFullTimeFormat;
  }

  set useFullTimeFormat(useFullTimeFormat: boolean) {
    this._useFullTimeFormat = useFullTimeFormat;
  }

  @Input()
  get step(): number {
    return this._step;
  }

  set step(step: number) {
    this._step = step;
  };

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
   * Sets all icon configurable properties via config object.
   * If passed value is a string set icon name.
   * @docs-private
   */
  @Input() showFooter: boolean = true;

  @Output() onSelectTime: EventEmitter<NbSelectedTimePayload<D>> = new EventEmitter<NbSelectedTimePayload<D>>();

  get timeFormat(): string {
    return this._timeFormat;
  }

  set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
  }

  fullTimeOptions: string[];
  hoursColumnOptions: string[];
  minutesColumnOptions: string[];
  secondsColumnOptions: string[];
  ampmColumnOptions: string[];
  _isTwelveHoursFormat: boolean;
  _withSeconds: boolean;
  _useFullTimeFormat: boolean;
  _step: number;
  _timeFormat: string;
  @ViewChild(NbPortalDirective, {static: true}) portal: NbPortalDirective;

  readonly HOURS_IND_DAY: number = 12;
  fullTime: NbTimepickerTypes = NbTimepickerTypes.FULL_TIME;
  hour: NbTimepickerTypes = NbTimepickerTypes.HOUR;
  minute: NbTimepickerTypes = NbTimepickerTypes.MINUTE;
  sec: NbTimepickerTypes = NbTimepickerTypes.SECOND;
  ampm: NbTimepickerTypes = NbTimepickerTypes.AMPM;
  hostRef: ElementRef;

  constructor(@Inject(NB_TIME_PICKER_CONFIG) config: NbTimePickerConfig,
              @Inject(LOCALE_ID) locale: string,
              protected cd: ChangeDetectorRef,
              protected nbCalendarTimeModelService: NbCalendarTimeModelService<D>,
              protected dateService: NbDateService<D>) {

    if (config.isTwelveHoursFormat) {
      this.isTwelveHoursFormat = config.isTwelveHoursFormat;
    } else {
      this.isTwelveHoursFormat = dateService.getLocaleTimeFormat().includes('h');
    }
  }

  ngOnChanges({step, isTwelveHoursFormat}: SimpleChanges): void {
    this.timeFormat = this.buildTimeFormat();
    if (step || isTwelveHoursFormat) {
      this.fullTimeOptions = this.useFullTimeFormat ?
        this.nbCalendarTimeModelService.getFullHours(this.isTwelveHoursFormat, this.step) : [];
      this.hoursColumnOptions = this.nbCalendarTimeModelService.getHoursInDay(this.isTwelveHoursFormat);
      this.minutesColumnOptions = this.nbCalendarTimeModelService.getMinutesAndSeconds();
      this.secondsColumnOptions = this.withSeconds ? this.nbCalendarTimeModelService.getMinutesAndSeconds() : [];
      this.ampmColumnOptions = this.isTwelveHoursFormat ? this.nbCalendarTimeModelService.AMPM : [];
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
    if (this.useFullTimeFormat) {
      newTime = this.dateService.parse(`Jan 1 ${value}`, this.timeFormat);
    } else if (this.isTwelveHoursFormat && this.nbCalendarTimeModelService.getAmPm(this.date) ===
      this.nbCalendarTimeModelService.PM) {
      newTime = this.dateService.setHour(this.date, parseInt(value, 10) - this.HOURS_IND_DAY);
    } else {
      const strValue = parseInt(value, 10);
      switch (type) {
        case NbTimepickerTypes.HOUR:
          newTime = this.dateService.setHour(this.date, strValue);
          break;
        case NbTimepickerTypes.MINUTE:
          newTime = this.dateService.setMinute(this.date, strValue);
          break;
        case NbTimepickerTypes.SECOND:
          newTime = this.dateService.setSecond(this.date, strValue);
          break;
      }
    }

    this.updateValue(newTime)
  }

  changeAMPM({value}: NbSelectedTimeModel) {
    const currentDateAMPM: string = this.nbCalendarTimeModelService.getAmPm(this.date);

    if (currentDateAMPM === value) {
      return;
    }

    const increment = (currentDateAMPM === this.nbCalendarTimeModelService.PM ? -1 : 1) * this.HOURS_IND_DAY;

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
    return this.withSeconds && !this.useFullTimeFormat;
  }

  isSelectedTimeValue(value: string, type: string) {
    switch (type) {
      case NbTimepickerTypes.HOUR:
        const hour: number = this.dateService.getHour(this.date);
        const selectedHour: string = this.nbCalendarTimeModelService.formatToString(
          this.isTwelveHoursFormat && hour > this.HOURS_IND_DAY ? hour - this.HOURS_IND_DAY : hour);

        return (value === selectedHour) || (selectedHour === '00' && value === this.HOURS_IND_DAY.toString());
      case NbTimepickerTypes.MINUTE:
        const minute: string = this.nbCalendarTimeModelService.formatToString(this.dateService.getMinute(this.date));
        return value === minute;
      case NbTimepickerTypes.SECOND:
        const second: string = this.nbCalendarTimeModelService.formatToString(this.dateService.getSecond(this.date));
        return value === second;
      case NbTimepickerTypes.AMPM:
        if (value === this.nbCalendarTimeModelService.PM) {
          return this.dateService.getHour(this.date) > this.HOURS_IND_DAY;
        } else {
          return this.dateService.getHour(this.date) <= this.HOURS_IND_DAY;
        }
      case NbTimepickerTypes.FULL_TIME:
        return value === this.dateService.format(this.date, this.timeFormat);
    }
  }

  buildTimeFormat(): string {
    return `${this.isTwelveHoursFormat ? 'hh' : 'HH'}:mm${this.withSeconds && !this.useFullTimeFormat ?
      ':ss' : ''}${this.isTwelveHoursFormat ? ' A' : ''}`
  }
}
