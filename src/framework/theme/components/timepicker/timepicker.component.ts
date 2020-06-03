import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Output,
  ViewChild,
} from '@angular/core';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import {
  NB_TIME_PICKER_CONFIG,
  NbSelectedTimeModel,
  NbSelectedTimePayload, NbTimePickerConfig,
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
export class NbTimePickerComponent<D> implements DoCheck {

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
  get selectedTime(): NbSelectedTimeModel {
    return this._selectedTime;
  }
  set selectedTime(newValue: NbSelectedTimeModel) {
    this._selectedTime = newValue;
    this.cd.detectChanges();
  }

  @Input()
  get step(): number {
    return this._step;
  }
  set step(step: number) {
    this._step = step === 0 ? this._step : step;
  };

  /**
   * Sets all icon configurable properties via config object.
   * If passed value is a string set icon name.
   * @docs-private
   */
  @Input() showFooter: boolean = true;

  @Output() onSelectTime: EventEmitter<NbSelectedTimePayload> = new EventEmitter<NbSelectedTimePayload>();

  get timeFormat(): string {
    return this._timeFormat;
  }
  set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
  }

  get getSelectedTime(): NbSelectedTimeModel {
    return this._selectedTime;
  }

  fullTimeOptions: string[];
  hoursColumnOptions: string[];
  minutesColumnOptions: string[];
  secondsColumnOptions: string[];
  ampmColumnOptions: string[];

  _isTwelveHoursFormat: boolean;
  _withSeconds: boolean;
  _useFullTimeFormat: boolean;
  _step: number = 60;
  _selectedTime: NbSelectedTimeModel;
  _timeFormat: string;
  @ViewChild(NbPortalDirective, {static: true}) portal: NbPortalDirective;

  fullTime: NbTimepickerTypes = NbTimepickerTypes.FULL_TIME;
  hour: NbTimepickerTypes = NbTimepickerTypes.HOUR;
  minute: NbTimepickerTypes = NbTimepickerTypes.MINUTE;
  sec: NbTimepickerTypes = NbTimepickerTypes.SEC;
  ampm: NbTimepickerTypes = NbTimepickerTypes.AMPM;
  hostRef: ElementRef;

  constructor(@Inject(NB_TIME_PICKER_CONFIG) config: NbTimePickerConfig,
              @Inject(LOCALE_ID) locale: string,
              protected cd: ChangeDetectorRef,
              protected nbCalendarTimeModelService: NbCalendarTimeModelService,
              protected dateService: NbDateService<D>) {

    if (config.isTwelveHoursFormat) {
      this.isTwelveHoursFormat = config.isTwelveHoursFormat;
    } else {
      this.isTwelveHoursFormat = dateService.getLocaleTimeFormat().includes('h');
    }
  }

  ngDoCheck(): void {
    this.fullTimeOptions = this.useFullTimeFormat ?
      this.nbCalendarTimeModelService.getFullHours(this.isTwelveHoursFormat, this.step) : [];
    this.hoursColumnOptions = this.nbCalendarTimeModelService.getHoursInDay(this.isTwelveHoursFormat);
    this.minutesColumnOptions = this.nbCalendarTimeModelService.getMinutesAndSeconds();
    this.secondsColumnOptions = this.withSeconds ? this.nbCalendarTimeModelService.getMinutesAndSeconds() : [];
    this.ampmColumnOptions = this.isTwelveHoursFormat ? this.nbCalendarTimeModelService.AMPM : [];
    this.timeFormat = this.buildTimeFormat();
    this.selectedTime = this.getSelectedTime || {
      fullTime: this.fullTimeOptions[0],
      hour: this.hoursColumnOptions[0],
      minute: this.minutesColumnOptions[0],
      ampm: this.ampmColumnOptions[0],
      sec: this.secondsColumnOptions[0],
    };
  }

  setHost(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  setCurrentTime() {
    this.selectedTime = this.parseTimeValue(this.dateService.getCurrentTime(this.timeFormat));
    this.onSelectTime.emit({
      time: this.parseTimeValue(this.dateService.getCurrentTime(this.timeFormat)),
      twelveHourFormat: this.isTwelveHoursFormat,
      format: this.timeFormat,
      save: true,
    });
  }

  select(newValue: NbSelectedTimeModel) {
    this.selectedTime = {...this.getSelectedTime, ...newValue};
    this.updateValue();
  }

  updateValue() {
    this.onSelectTime.emit(
      {
        time: this.getSelectedTime,
        twelveHourFormat: this.isTwelveHoursFormat,
        format: this.timeFormat,
      });
  }

  saveValue() {
    this.onSelectTime.emit({
      time: this.getSelectedTime,
      twelveHourFormat: this.isTwelveHoursFormat,
      format: this.timeFormat,
      save: true,
    });
  }

  showSeconds(): boolean {
    return this.withSeconds && !this.useFullTimeFormat;
  }

  buildTimeFormat(): string {
    return `${this.isTwelveHoursFormat ? 'hh' : 'HH'}:mm${this.withSeconds && !this.useFullTimeFormat ?
      ':ss' : ''}${this.isTwelveHoursFormat ? ' A' : ''}`
  }

  parseTimeValue(time: string): NbSelectedTimeModel {
    const currentTime = time.split(/[: ]/);

    return {
      hour: currentTime[0],
      minute: currentTime[1],
      sec: this.withSeconds && !this.useFullTimeFormat ? currentTime[2] : '',
      ampm: currentTime.find(item => item === 'AM' || item === 'PM'),
      fullTime: time,
    };
  }
}
