import { Component, ComponentFactoryResolver, Inject, Input, OnInit, Optional, Type } from '@angular/core';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { Observable } from 'rxjs';
import { NbBasePickerComponent } from './datepicker.component';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NB_DOCUMENT } from '../../theme.options';
import { NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NB_DATE_SERVICE_OPTIONS } from './datepicker.directive';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

@Component({
  selector: 'nb-date-timepicker',
  template: '',
})
export class NbDateTimePickerComponent<D>
  extends NbBasePickerComponent<D, D, NbCalendarWithTimeComponent<D>>
  implements OnInit {
  protected pickerClass: Type<NbCalendarWithTimeComponent<D>> = NbCalendarWithTimeComponent;
  _isTwelveHoursFormat: boolean;
  _withSeconds: boolean;
  _singleColumn: boolean;

  @Input()
  get isTwelveHoursFormat(): boolean {
    return this._isTwelveHoursFormat;
  }

  set isTwelveHoursFormat(value: boolean) {
    this._isTwelveHoursFormat = convertToBoolProperty(value);
  };

  static ngAcceptInputType_isTwelveHoursFormat: NbBooleanInput;

  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }

  set withSeconds(value: boolean) {
    this._withSeconds = convertToBoolProperty(value);
  };

  static ngAcceptInputType_withSeconds: NbBooleanInput;

  @Input()
  get singleColumn(): boolean {
    return this._singleColumn;
  }

  set singleColumn(value: boolean) {
    this._singleColumn = convertToBoolProperty(value);
  }

  static ngAcceptInputType_singleColumn: NbBooleanInput;

  @Input() step: number;
  @Input() title: string;
  @Input() applyButtonText: string;
  @Input() currentTimeButtonText: string;

  ngOnInit() {
    this.format = this.format || this.buildTimeFormat();
  }

  constructor(@Inject(NB_DOCUMENT) document,
              positionBuilder: NbPositionBuilderService,
              triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              overlay: NbOverlayService,
              cfr: ComponentFactoryResolver,
              dateService: NbDateService<D>,
              @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) dateServiceOptions,
              protected calendarWithTimeModelService: NbCalendarTimeModelService<D>) {
    super(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions);
  }

  protected patchWithInputs() {
    this.picker.singleColumn = this.singleColumn;
    this.picker.isTwelveHoursFormat = this.isTwelveHoursFormat;
    this.picker.withSeconds = this.withSeconds;
    this.picker.step = this.step;
    this.picker.title = this.title;
    this.picker.applyButtonText = this.applyButtonText;
    this.picker.currentTimeButtonText = this.currentTimeButtonText;

    if (this.isTwelveHoursFormat) {
      this.picker.timeFormat = this.dateService.getTwelveHoursFormat();
    } else {
      this.picker.timeFormat = this.withSeconds ? this.dateService.getTwentyFourHoursFormatWithSeconds() :
        this.dateService.getTwentyFourHoursFormat();
    }
    super.patchWithInputs();
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
    }
  }

  buildTimeFormat(): string {
    if (this.singleColumn) {
      return this.calendarWithTimeModelService.buildDateFormat(this.isTwelveHoursFormat);
    } else {
      return this.calendarWithTimeModelService.buildDateFormat(this.isTwelveHoursFormat, this.withSeconds);
    }
  }
}

