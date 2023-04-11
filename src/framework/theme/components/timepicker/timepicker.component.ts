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
import { Observable, Subject } from 'rxjs';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import { NbPlatform } from '../cdk/platform/platform-service';
import { NbDateService, NbDayPeriod } from '../calendar-kit/services/date.service';
import { range, rangeFromTo } from '../calendar-kit/helpers';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import {
  NB_DEFAULT_TIMEPICKER_LOCALIZATION_CONFIG,
  NB_TIME_PICKER_CONFIG,
  NbSelectedTimePayload,
  NbTimePickerConfig,
} from './model';

interface NbTimePartOption {
  value: number;
  text: string;
}

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
export class NbTimePickerComponent<D> implements OnChanges {
  protected blur$: Subject<void> = new Subject<void>();

  fullTimeOptions: D[];
  hoursColumnOptions: NbTimePartOption[];
  minutesColumnOptions: NbTimePartOption[];
  secondsColumnOptions: NbTimePartOption[];
  readonly dayPeriodColumnOptions = [NbDayPeriod.AM, NbDayPeriod.PM];
  hostRef: ElementRef;
  isAM = true;

  timepickerFormatChange$: Subject<void> = new Subject();

  /**
   * Emits when timepicker looses focus.
   */
  get blur(): Observable<void> {
    return this.blur$.asObservable();
  }

  /**
   * Defines time format string.
   * */
  @Input()
  get timeFormat(): string {
    return this._timeFormat;
  }
  set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
  }
  protected _timeFormat: string;

  computedTimeFormat: string = this.setupTimeFormat();

  /**
   * Defines 12 hours format .
   * */
  @Input()
  get twelveHoursFormat(): boolean {
    return this._twelveHoursFormat;
  }
  set twelveHoursFormat(value: boolean) {
    this._twelveHoursFormat = convertToBoolProperty(value);
  }
  protected _twelveHoursFormat: boolean;
  static ngAcceptInputType_twelveHoursFormat: NbBooleanInput;

  /**
   * Defines should show am/pm label if twelveHoursFormat enabled.
   * */
  @Input()
  get showAmPmLabel(): boolean {
    return this._showAmPmLabel;
  }
  set showAmPmLabel(value: boolean) {
    this._showAmPmLabel = convertToBoolProperty(value);
  }
  protected _showAmPmLabel: boolean = true;
  static ngAcceptInputType_showAmPmLabel: NbBooleanInput;

  /**
   * Show seconds in timepicker.
   * Ignored when singleColumn is true
   * */
  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }
  set withSeconds(value: boolean) {
    this._withSeconds = convertToBoolProperty(value);
  }
  protected _withSeconds: boolean;
  static ngAcceptInputType_withSeconds: NbBooleanInput;

  /**
   * Show timepicker values in one column with 60 minutes step by default.
   * */
  @Input()
  get singleColumn(): boolean {
    return this._singleColumn;
  }
  set singleColumn(value: boolean) {
    this._singleColumn = convertToBoolProperty(value);
  }
  _singleColumn: boolean;
  static ngAcceptInputType_singleColumn: NbBooleanInput;

  /**
   * Defines minutes offset for options, when timepicker is in single column mode.
   * By default it’s 60 minutes: '12:00, 13:00: 14:00, 15:00...'
   * */
  @Input()
  set step(step: number) {
    this._step = step;
  }
  get step(): number {
    return this._step;
  }
  protected _step: number;

  /**
   * Date which will be rendered as selected.
   * */
  @Input()
  set date(date: D) {
    this._date = date;
    this.isAM = this.dateService.getDayPeriod(this.date) === NbDayPeriod.AM;
    this.buildColumnOptions();
    this.cd.markForCheck();
  }

  get date(): D {
    return this._date;
  }

  _date: D;

  /**
   * In timepicker value should be always true
   * In calendar-with-time.component  should set to false
   * @docs-private
   */
  @Input() showFooter: boolean = true;
  @Input() applyButtonText: string;
  @Input() hoursText: string;
  @Input() minutesText: string;
  @Input() secondsText: string;
  @Input() ampmText: string;
  @Input() currentTimeButtonText: string;

  /**
   * Emits date when selected.
   * */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectTime: EventEmitter<NbSelectedTimePayload<D>> = new EventEmitter<NbSelectedTimePayload<D>>();
  @ViewChild(NbPortalDirective, { static: true }) portal: NbPortalDirective;

  constructor(
    @Inject(NB_TIME_PICKER_CONFIG) protected config: NbTimePickerConfig,
    protected platformService: NbPlatform,
    @Inject(LOCALE_ID) locale: string,
    public cd: ChangeDetectorRef,
    protected calendarTimeModelService: NbCalendarTimeModelService<D>,
    protected dateService: NbDateService<D>,
  ) {
    this.initFromConfig(this.config);
  }

  ngOnChanges({ step, twelveHoursFormat, withSeconds, singleColumn }: SimpleChanges): void {
    const nextTimeFormat = this.setupTimeFormat();
    if (nextTimeFormat !== this.computedTimeFormat) {
      this.computedTimeFormat = nextTimeFormat;
      this.timepickerFormatChange$.next();
    }

    const isConfigChanged = step || twelveHoursFormat || withSeconds || singleColumn;

    if (isConfigChanged || !this.fullTimeOptions) {
      this.buildColumnOptions();
    }
  }

  setHost(hostRef: ElementRef): void {
    this.hostRef = hostRef;
  }

  attach(hostRef: ElementRef): void {
    this.hostRef = hostRef;
  }

  setCurrentTime(): void {
    this.date = this.dateService.today();
    this.onSelectTime.emit({
      time: this.date,
      save: true,
    });
  }

  setHour(value: number): void {
    this.updateValue(this.dateService.setHours(this.date, value));
  }

  setMinute(value: number): void {
    this.updateValue(this.dateService.setMinutes(this.date, value));
  }

  setSecond(value: number): void {
    this.updateValue(this.dateService.setSeconds(this.date, value));
  }

  selectFullTime(value: D): void {
    this.updateValue(value);
  }

  changeDayPeriod(dayPeriodToSet: NbDayPeriod): void {
    if (this.dateService.getDayPeriod(this.date) === dayPeriodToSet) {
      return;
    }

    // Subtract hours when switching to AM (before midday, 0-11 in 24-hour) from PM (after midday, 12-24 in 24-hour),
    // otherwise add hours because switching to PM from AM.
    const direction = dayPeriodToSet === NbDayPeriod.AM ? -1 : 1;
    const increment = direction * this.dateService.HOURS_IN_DAY_PERIOD;
    this.updateValue(this.dateService.addHours(this.date, increment));
  }

  updateValue(date: D): void {
    this.onSelectTime.emit({ time: date });
  }

  saveValue(): void {
    this.onSelectTime.emit({
      time: this.date,
      save: true,
    });
  }

  trackByTimeValues(index, item: NbTimePartOption): number {
    return item.value;
  }

  trackBySingleColumnValue(index, item: D) {
    return this.dateService.valueOf(item);
  }

  trackByDayPeriod(index, item: NbDayPeriod): string {
    return item;
  }

  showSeconds(): boolean {
    return this.withSeconds && !this.singleColumn;
  }

  isSelectedHour(val: number): boolean {
    if (this.date) {
      return this.dateService.getHours(this.date) === val;
    }

    return false;
  }

  isSelectedMinute(val: number): boolean {
    if (this.date) {
      return this.dateService.getMinutes(this.date) === val;
    }

    return false;
  }

  isSelectedSecond(val: number): boolean {
    if (this.date) {
      return this.dateService.getSeconds(this.date) === val;
    }

    return false;
  }

  isSelectedDayPeriod(dayPeriod: NbDayPeriod): boolean {
    if (this.date) {
      return dayPeriod === this.dateService.getDayPeriod(this.date);
    }

    return false;
  }

  getFullTimeString(item: D): string {
    return this.dateService.format(item, this.computedTimeFormat).toUpperCase();
  }

  isSelectedFullTimeValue(value: D): boolean {
    if (this.date) {
      return this.dateService.isSameHourAndMinute(value, this.date);
    }

    return false;
  }

  protected buildColumnOptions(): void {
    this.fullTimeOptions = this.singleColumn ? this.calendarTimeModelService.getHoursRange(this.step) : [];

    this.hoursColumnOptions = this.generateHours();
    this.minutesColumnOptions = this.generateMinutesOrSeconds();
    this.secondsColumnOptions = this.showSeconds() ? this.generateMinutesOrSeconds() : [];
  }

  /**
   * @docs-private
   */
  isFirefox(): boolean {
    return this.platformService.FIREFOX;
  }

  protected generateHours(): NbTimePartOption[] {
    if (!this.twelveHoursFormat) {
      return range(24, (v: number) => {
        return { value: v, text: this.calendarTimeModelService.paddToTwoSymbols(v) };
      });
    }

    if (this.isAM) {
      return range(12, (v: number) => {
        const text = v === 0 ? 12 : v;
        return { value: v, text: this.calendarTimeModelService.paddToTwoSymbols(text) };
      });
    }

    return rangeFromTo(12, 24, (v: number) => {
      const text = v === 12 ? 12 : v - 12;
      return { value: v, text: this.calendarTimeModelService.paddToTwoSymbols(text) };
    });
  }

  protected generateMinutesOrSeconds(): NbTimePartOption[] {
    return range(60, (v: number) => {
      return { value: v, text: this.calendarTimeModelService.paddToTwoSymbols(v) };
    });
  }

  protected setupTimeFormat(): string {
    if (!this.timeFormat) {
      return this.config.format || this.buildTimeFormat();
    }

    return this.timeFormat;
  }

  /**
   * @docs-private
   */
  buildTimeFormat(): string {
    if (this.twelveHoursFormat) {
      return `${
        this.withSeconds && !this.singleColumn
          ? this.dateService.getTwelveHoursFormatWithSeconds()
          : this.dateService.getTwelveHoursFormat()
      }`;
    } else {
      return `${
        this.withSeconds && !this.singleColumn
          ? this.dateService.getTwentyFourHoursFormatWithSeconds()
          : this.dateService.getTwentyFourHoursFormat()
      }`;
    }
  }

  protected initFromConfig(config: NbTimePickerConfig) {
    if (config) {
      this.twelveHoursFormat = config.twelveHoursFormat;
    } else {
      this.twelveHoursFormat = this.dateService.getLocaleTimeFormat().includes('h');
    }

    const localeConfig = { ...NB_DEFAULT_TIMEPICKER_LOCALIZATION_CONFIG, ...(config?.localization ?? {}) };
    this.hoursText = localeConfig.hoursText;
    this.minutesText = localeConfig.minutesText;
    this.secondsText = localeConfig.secondsText;
    this.ampmText = localeConfig.ampmText;
  }
}
