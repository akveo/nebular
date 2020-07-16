import { Component, ComponentFactoryResolver, Inject, Input, OnInit, Optional, Type } from '@angular/core';
import { NbCalendarWithTime, NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { Observable } from 'rxjs';
import { NbBasePickerComponent } from './datepicker.component';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NB_DOCUMENT } from '../../theme.options';
import { NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NB_DATE_SERVICE_OPTIONS } from './datepicker.directive';

@Component({
  selector: 'nb-date-timepicker',
  template: '',
})

export class NbDateTimePickerComponent<D>
  extends NbBasePickerComponent<D, NbCalendarWithTime, NbCalendarWithTimeComponent<D>>
  implements OnInit {
  protected pickerClass: Type<NbCalendarWithTimeComponent<D>> = NbCalendarWithTimeComponent;

  @Input() isTwelveHoursFormat: boolean;
  @Input() withSeconds: boolean;
  @Input() singleColumn: boolean;
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
      this.picker.timeFormat = this.calendarWithTimeModelService.twelveHoursTimeFormat;
    } else {
      this.picker.timeFormat = this.withSeconds ? this.calendarWithTimeModelService.timeFormatWithSeconds :
        this.calendarWithTimeModelService.timeFormatWithSeconds;
    }
    super.patchWithInputs();
  }

  protected get pickerValueChange(): Observable<any> {
    return this.picker.dateChange;
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
    if (this.isTwelveHoursFormat) {
      return `${this.calendarWithTimeModelService.dateFormat} ${
        this.calendarWithTimeModelService.twelveHoursTimeFormat}`
    } else {
      if (this.withSeconds && !this.singleColumn) {
        return `${this.calendarWithTimeModelService.dateFormat} ${
          this.calendarWithTimeModelService.timeFormatWithSeconds}`
      } else {
        return `${this.calendarWithTimeModelService.dateFormat} ${
          this.calendarWithTimeModelService.timeFormat}`
      }
    }
  }
}

