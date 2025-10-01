import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Type,
} from '@angular/core';
import { Observable } from 'rxjs';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbBasePickerComponent } from './datepicker.component';
import { NB_DATE_SERVICE_OPTIONS } from './datepicker.directive';

/**
 * The DateTimePicker component itself.
 * Provides a proxy to `NbCalendarWithTimeComponent` options as well as custom picker options.
 */
@Component({
    selector: 'nb-date-timepicker',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NbDateTimePickerComponent<D>
  extends NbBasePickerComponent<D, D, NbCalendarWithTimeComponent<D>>
  implements OnInit
{
  protected pickerClass: Type<NbCalendarWithTimeComponent<D>> = NbCalendarWithTimeComponent;

  get value(): any {
    return this.picker ? this.picker.date : undefined;
  }
  set value(date: any) {
    if (!this.picker) {
      this.queue = date;
      return;
    }

    if (date) {
      this.visibleDate = date;
      this.picker.visibleDate = date;
      this.picker.date = date;
      this.picker.cd.markForCheck();
    }
  }

  /**
   * Defines minutes step when we use fill time format.
   * If set to 20, it will be: '12:00, 12:20: 12:40, 13:00...'
   * */
  @Input() step: number;

  @Input() title: string;
  @Input() applyButtonText: string;
  @Input() currentTimeButtonText: string;
  @Input() showCurrentTimeButton = true;

  /**
   * Defines 12 hours format like '07:00 PM'.
   * */
  @Input()
  get twelveHoursFormat(): boolean {
    return this._twelveHoursFormat;
  }
  set twelveHoursFormat(value: boolean) {
    this._twelveHoursFormat = convertToBoolProperty(value);
  }
  _twelveHoursFormat: boolean;
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
   * Ignored when singleColumn is true.
   * */
  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }
  set withSeconds(value: boolean) {
    this._withSeconds = convertToBoolProperty(value);
  }
  _withSeconds: boolean;
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
   * Emits date with time when selected.
   * */
  @Output() get dateTimeChange(): EventEmitter<D> {
    return this.valueChange as EventEmitter<D>;
  }

  constructor(
    @Inject(NB_DOCUMENT) document,
    positionBuilder: NbPositionBuilderService,
    triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    overlay: NbOverlayService,
    dateService: NbDateService<D>,
    @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) dateServiceOptions,
    protected calendarWithTimeModelService: NbCalendarTimeModelService<D>,
  ) {
    super(document, positionBuilder, triggerStrategyBuilder, overlay, dateService, dateServiceOptions);
  }

  ngOnInit() {
    this.format = this.format || this.buildTimeFormat();
    this.init$.next();
  }

  protected patchWithInputs() {
    this.picker.singleColumn = this.singleColumn;
    this.picker.twelveHoursFormat = this.twelveHoursFormat;
    this.picker.showAmPmLabel = this.showAmPmLabel;
    this.picker.withSeconds = this.withSeconds;
    this.picker.step = this.step;
    this.picker.title = this.title;
    this.picker.applyButtonText = this.applyButtonText;
    this.picker.currentTimeButtonText = this.currentTimeButtonText;
    this.picker.showCurrentTimeButton = this.showCurrentTimeButton;

    if (this.twelveHoursFormat) {
      this.picker.timeFormat = this.dateService.getTwelveHoursFormat();
    } else {
      this.picker.timeFormat =
        this.withSeconds && !this.singleColumn
          ? this.dateService.getTwentyFourHoursFormatWithSeconds()
          : this.dateService.getTwentyFourHoursFormat();
    }
    super.patchWithInputs();

    this.picker.cd.markForCheck();
  }

  protected get pickerValueChange(): Observable<any> {
    return this.picker.dateChange;
  }

  protected writeQueue() {
    if (this.queue) {
      const date = this.queue;
      this.queue = null;
      this.value = date;
    }
  }

  protected buildTimeFormat(): string {
    if (this.singleColumn) {
      return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat);
    } else {
      return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat, this.withSeconds);
    }
  }
}
