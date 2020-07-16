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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbSelectedTimePayload } from './model';
import { NbDateService } from '../calendar-kit/services/date.service';

/**
 * The `NbTimePickerDirective` is form control that gives you ability to select time. The timepicker
 * is shown when input receives a `focus` event.
 *
 * ```html
 * <input [nbTimepicker]="timepicker">
 * <nb-timepicker #timepicker></nb-datepicker>
 * ```
 *
 * @stacked-example(Showcase, timepicker/timepicker-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTimepickerModule.forRoot()` to your root module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTimepickerModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * And `NbTimepickerModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTimepickerModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * With Seconds
 *
 * ```html
 * <input [nbTimepicker]="timepicker">
 * <nb-timepicker #timepicker withSeconds></nb-timepicker>
 * ```
 * @stacked-example(Time picker with seconds, timepicker/timepicker-with-seconds.component)
 *
 * You can specify twelve hours format:
 *
 * ```html
 * <input [nbTimepicker]="timepicker" isTwelveHoursFormat>
 * <nb-timepicker #timepicker></nb-datepicker>
 * ```
 *
 * @stacked-example(Twelve hours format showcase, timepicker/timepicker-twelve-hours-format.component)
 *
 * Additionally you can enable singleColumn property to display a single picker with concatenated time values inside.
 * For such display mode 'step' property controls time values step, e.g.: 11:00, 11:20, 11:40, 12:00 ...'
 *
 * @stacked-example(Single column, timepicker/timepicker-single-column.component)
 *
 * @styles
 *
 * timepicker-color:
 * timepicker-hover-background-color:
 * timepicker-hover-color:
 * timepicker-focus-background-color:
 * timepicker-focus-color:
 * timepicker-active-background-color:
 * timepicker-active-color:
 * timepicker-cell-text-font-size:
 * timepicker-cell-text-font-weight:
 * timepicker-basic-color:
 * timepicker-border-color:
 * timepicker-border-style:
 * timepicker-border-width:
 * timepicker-scrollbar-color:
 * timepicker-scrollbar-background-color:
 * timepicker-scrollbar-width:
 * timepicker-cell-line-height:
 * timepicker-cell-font-size:
 * timepicker-single-column-width:
 * timepicker-multiple-column-width:
 * timepicker-title-height:
 * timepicker-title-padding:
 * timepicker-container-width:
 * timepicker-container-height:
 * */
@Directive({
  selector: 'input[nbTimepicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbTimePickerDirective),
    multi: true,
  }],
})
export class NbTimePickerDirective<D> implements AfterViewInit, ControlValueAccessor {
  /**
   * Provides timepicker component.
   * */
  @Input('nbTimepicker')
  get timepicker(): NbTimePickerComponent<D> {
    return this._timePickerComponent;
  }

  set timepicker(timePicker: NbTimePickerComponent<D>) {
    this._timePickerComponent = timePicker;
  }

  /**
   * NbTimePickerComponent instance passed via input.
   * @docs-private
   * */
  protected _timePickerComponent: NbTimePickerComponent<D>;

  /**
   * Positioning strategy used by overlay.
   * @docs-private
   * */
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected overlayRef: NbOverlayRef;
  protected overlayOffset = 8;
  protected destroy$: Subject<void> = new Subject<void>();
  protected _onChange: (value: string) => void = () => {};
  protected _onTouched = () => {};
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
   * Determines is timepicker overlay opened.
   * */
  get isOpen(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
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
              protected dateService: NbDateService<D>,
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
    this.input.placeholder = this.timepicker.timeFormat;
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

  /**
   * Attaches picker to the timepicker portal.
   * */
  protected attachToOverlay() {
    if (!this.overlayRef) {
      this.setupTimepicker();
      this.initOverlay();
    }
    this.overlayRef.attach(this.timepicker.portal);
  }

  setupTimepicker() {
    this.timepicker.setHost(this.hostRef);
    if (this.timepicker.date) {
     this.timepicker.date = this.dateService.parse(this.inputValue, this.timepicker.timeFormat);
    } else {
     let today = this.dateService.today();
     today = this.dateService.setHour(today, 0);
     today = this.dateService.setMinute(today, 0);
     today = this.dateService.setSecond(today, 0);

     this.timepicker.date = today;
    }
  }

  protected initOverlay() {
    this.positionStrategy = this.createPositionStrategy();
    this.subscribeOnApplyClick();
    this.createOverlay();
  }

  protected subscribeOnApplyClick() {
    this.timepicker.onSelectTime.subscribe((value: NbSelectedTimePayload<D>) => {
      this.setInputValue = this.dateService.format(value.time, value.format).toUpperCase();
      this.timepicker.date = value.time;
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
    .subscribe((value: string) => {
      this.handleInputChange(value);
    });
  }

  /**
   * Parses input value and write if it isn't null.
   * */
  protected handleInputChange(value: string) {
    const isValidDate: boolean = this.dateService.isValidDateString(value, this.timepicker.timeFormat);
    if (isValidDate) {
      this.timepicker.date = this.dateService.parse(value, this.timepicker.timeFormat);
    }
  }

  writeValue(value: string): void {
    this.handleInputChange(value);
  }

  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
