import {
  AfterViewInit,
  Attribute,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  Renderer2,
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
import { fromEvent, merge, Subject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbSelectedTimePayload } from './model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NB_DOCUMENT } from '../../theme.options';

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
 *
 * ```
 * <div class="note note-info">
 * <div class="note-title">Note</div>
 * <div class="note-body">
 *  Date.parse noes not support parsing time with custom format, we highly recommend to use NbDateFnsDateModule
 *  or NbMomentDateModule instead of native date service (Default date module).
 *  If you want to use default service you should set ISO 8061 time format.
 * </div>
 * </div>
 * <hr>
 *
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
 * timepicker-text-color:
 * timepicker-hover-background-color:
 * timepicker-text-hover-color:
 * timepicker-focus-background-color:
 * timepicker-text-focus-color:
 * timepicker-active-background-color:
 * timepicker-text-active-color:
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
   * Time picker overlay offset
   * */
  @Input() overlayOffset = 8;

  /**
   * NbTimePickerComponent instance passed via input.
   * */
  protected _timePickerComponent: NbTimePickerComponent<D>;

  protected lastInputValue: string;
  /**
   * Positioning strategy used by overlay.
   * @docs-private
   * */
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected overlayRef: NbOverlayRef;
  protected destroy$: Subject<void> = new Subject<void>();
  protected onChange: (value: D) => void = () => {
  };
  protected onTouched = () => {
  };
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

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected hostRef: ElementRef,
              protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              protected overlay: NbOverlayService,
              protected cd: ChangeDetectorRef,
              protected calendarTimeModelService: NbCalendarTimeModelService<D>,
              protected dateService: NbDateService<D>,
              protected renderer: Renderer2,
              @Attribute('placeholder') protected placeholder: string) {
  }

  /**
   * Returns host input value.
   * */
  get inputValue(): string {
    return this.input.value;
  }

  set inputValue(value: string) {
    this.input.value = value;
  }

  ngAfterViewInit() {
    this.subscribeOnInputChange();

    if (!this.placeholder) {
      this.renderer.setProperty(this.input, 'placeholder', this.timepicker.timeFormat);
    }
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
    if (this.dateService.getId() === 'native') {
      console.warn('Date.parse noes not support parsing time with custom format, we highly recommend to use' +
        'fnsDate or moment date service instead of native date service.If you want to use native' +
        ' date service you should set ISO 8061 time format.')
    }
    this.timepicker.setHost(this.hostRef);
    if (this.inputValue) {
      this.timepicker.date = this.dateService.parse(this.inputValue, this.timepicker.timeFormat);
    } else {
      this.timepicker.date = this.calendarTimeModelService.getResetTime();
    }
  }

  protected initOverlay() {
    this.positionStrategy = this.createPositionStrategy();
    this.subscribeOnApplyClick();
    this.createOverlay();
  }

  protected subscribeOnApplyClick() {
    this.timepicker.onSelectTime.pipe(takeUntil(this.destroy$)).subscribe((value: NbSelectedTimePayload<D>) => {
      const time = this.dateService.format(value.time, this.timepicker.timeFormat).toUpperCase();
      this.inputValue = time;
      this.timepicker.date = value.time;
      this.onChange(value.time);
      if (value.save) {
        this.lastInputValue = time;
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
    .subscribe(() => {
      this.inputValue = this.lastInputValue || '';
      this.hide()
    });
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
      this.onBlur();
    });
  }

  protected onBlur() {
    merge(
      this.timepicker.blur,
      fromEvent(this.input, 'blur').pipe(
        filter(() => !this.isOpen && this.document.activeElement !== this.input),
      ),
    ).pipe(takeUntil(this.destroy$))
    .subscribe(() => this.onTouched());
  }

  /**
   * Parses input value and write if it isn't null.
   * */
  protected handleInputChange(value: string) {
    if (this.dateService.getId() === 'native') {
      /**
       * Native date service dont parse only time string value,
       * and we adding year mouth and day to convert string to valid date format
       **/
      value = this.parseNativeDateString(value);
    }

    const isValidDate: boolean = this.dateService.isValidDateString(value, this.timepicker.timeFormat);
    if (isValidDate) {
      this.timepicker.date = this.dateService.parse(value, this.timepicker.timeFormat);
    }
  }

  writeValue(value: string): void {
    this.handleInputChange(value);
  }

  registerOnChange(fn: (value: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected parseNativeDateString(value: string): string {
    const date = this.dateService.today();
    const year = this.dateService.getYear(date);
    const month = this.calendarTimeModelService.padd(this.dateService.getMonth(date));
    const day = this.calendarTimeModelService.padd(this.dateService.getDate(date));

    return `${year}-${month}-${day} ${value}`;
  }
}
