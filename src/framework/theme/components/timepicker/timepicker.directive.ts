import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  Input,
} from '@angular/core';
import { NbTimePickerComponent } from './timepicker.component';
import { NbOverlayRef, NbScrollStrategy } from '../cdk/overlay/mapping';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { fromEvent, Subject } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbSelectedTimePayload } from './model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';

@Directive({
  selector: 'input[nbTimepicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbTimePickerDirective),
    multi: true,
  }],
})
export class NbTimePickerDirective implements AfterViewInit {
  /**
   * NbTimePickerComponent instance passed via input.
   * */
  protected _timePickerComponent: NbTimePickerComponent<Date>;

  protected overlayRef: NbOverlayRef;

  protected overlayOffset = 8;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  protected destroy$: Subject<void> = new Subject<void>();

  /**
   * Provides timepicker component.
   * */
  @Input('nbTimepicker')
  get timepicker(): NbTimePickerComponent<Date> {
    return this._timePickerComponent;
  }
  set timepicker(timePicker: NbTimePickerComponent<Date>) {
    this._timePickerComponent = timePicker;
  }

  /**
   * Determines is timepicker overlay opened.
   * */
  get isOpen(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  /**
   * Trigger strategy used by overlay.
   * @docs-private
   * */
  protected triggerStrategy: NbTriggerStrategy;

  /**
   * Returns html input element.
   * */
  get input(): HTMLInputElement {
    return this.hostRef.nativeElement;
  }

  /**
   * Determines is timepicker overlay closed.
   * */
  get isClosed(): boolean {
    return !this.isOpen;
  }

  constructor(protected positionBuilder: NbPositionBuilderService,
              protected hostRef: ElementRef,
              protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              protected overlay: NbOverlayService,
              protected cd: ChangeDetectorRef,
              protected dateService: NbDateService<any>,
              protected nbCalendarTimeModelService: NbCalendarTimeModelService,
  ) {
    this.subscribeOnInputChange();
  }

  /**
   * Returns host input value.
   * */
  get inputValue(): string {
    return this.input.value;
  }

  set setInputValue(value: string) {
    this.input.value = value;
  }

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
  }

  show() {
    if (this.isClosed) {
      this.attachToOverlay();
    }
  }

  hide() {
    if (this.isOpen) {
      this.overlayRef.detach();
      this.cd.markForCheck();
    }
  }

  protected attachToOverlay() {
    if (!this.overlayRef) {
      this.setupTimepicker();
      this.initOverlay();
    }
    this.overlayRef.attach(this.timepicker.portal);
  }

  setupTimepicker() {
    this.timepicker.setHost(this.hostRef);
  }

  protected initOverlay() {
    this.positionStrategy = this.createPositionStrategy();
    this.subscribeOnApplyClick();
    this.createOverlay();
  }

  protected subscribeOnApplyClick() {
    this.timepicker.onSelectTime.subscribe((value: NbSelectedTimePayload) => {
      if (this.timepicker.useFullTimeFormat && value.time.fullTime) {
        this.setInputValue = value.time.fullTime;
      } else {
        const val = value.twelveHourFormat
          ? `${value.time.hour}:${value.time.minute}${value.time.sec ? ':' + value.time.sec : ''} ${value.time.ampm}` :
          `${value.time.hour}:${value.time.minute}${value.time.sec ? ':' + value.time.sec : ''}`;

        const date = this.dateService.parse(val, value.format);

        this.setInputValue = this.dateService.format(date, value.format);
      }

      if (value.save) {
        this.hide();
      }
    });
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.overlayRef = this.overlay.create(
      {positionStrategy: this.positionStrategy, scrollStrategy});
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$
    .pipe(filter(() => this.isClosed))
    .subscribe(() => this.show());

    this.triggerStrategy.hide$
    .pipe(filter(() => this.isOpen))
    .subscribe(() => this.hide());
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
    .trigger(NbTrigger.FOCUS)
    .host(this.hostRef.nativeElement)
    .container(() => this.getContainer())
    .build();
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
    .connectedTo(this.hostRef)
    .position(NbPosition.BOTTOM)
    .offset(this.overlayOffset)
    .adjustment(NbAdjustment.VERTICAL);
  }

  protected getContainer() {
    return this.overlayRef && this.isOpen && <ComponentRef<any>>{
      location: {
        nativeElement: this.overlayRef.overlayElement,
      },
    };
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
  }

  protected subscribeOnInputChange() {
    fromEvent(this.input, 'input')
    .pipe(
      map(() => this.inputValue),
      takeUntil(this.destroy$),
    )
    .subscribe((value: string) => this.handleInputChange(value));
  }

  /**
   * Parses input value and write if it isn't null.
   * */
  protected handleInputChange(value: string) {
    const isValidDate: boolean = this.dateService.isValidDateString(value, this.timepicker.timeFormat);

    if (isValidDate) {
      const date: Date = this.dateService.parse(value, this.timepicker.timeFormat);
      this.timepicker.selectedTime = {
        hour: this.formatToString(this.timepicker.isTwelveHoursFormat && value !== '12' ?
          this.dateService.getHour(date) % 12 : this.dateService.getHour(date)),
        minute: this.formatToString(this.dateService.getMinute(date)),
        sec: this.formatToString(this.dateService.getSecond(date)),
        ampm: this.nbCalendarTimeModelService.getAmPm(date, this.timepicker.timeFormat),
        fullTime: this.timepicker.useFullTimeFormat ?
          this.dateService.format(date, this.timepicker.timeFormat) : '',
      };
    }
  }

  protected formatToString(n: number): string {
    return n < 10 ? `0${n.toString()}` : n.toString();
  }
}
