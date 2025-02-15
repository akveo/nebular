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
  isDevMode,
  Renderer2,
} from '@angular/core';
import { distinctUntilChanged, filter, map, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { fromEvent, merge, Subject, Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbTimePickerComponent } from './timepicker.component';
import { NbOverlayRef, NbScrollStrategy } from '../cdk/overlay/mapping';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbSelectedTimePayload } from './model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import { NB_DOCUMENT } from '../../theme.options';

/**
 * The `NbTimePickerDirective` is form control that gives you ability to select a time. The timepicker
 * is shown when input receives a `focus` event.
 * ```html
 * <input [nbTimepicker]="timepicker">
 * <nb-timepicker #timepicker></nb-timepicker>
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
 * <div id="native-parse-issue" class="note note-warning">
 * <div class="note-title">Note</div>
 * <div class="note-body">
 * Timepicker uses native Date object by default, which doesn't support parsing by custom format.
 * According to the ECMAScript specification, the only supported format is a format described by ISO 8061 standard.
 * This standard requires date part to be included in the date string,
 * meaning you have to type a date+time in the input.
 * We highly recommend you to use NbDateFnsDateModule or NbMomentDateModule to be able to support time only strings in
 * the timepicker inputs. These modules use date-fns and moment date libraries, which provide capabilities
 * to parse time only strings.
 * See "Formatting Issue" at
 * <a href="https://akveo.github.io/nebular/docs/components/datepicker/overview#formatting-issue">Date picker docs</a>
 * for installation instructions.
 * </div>
 * </div>
 * <hr>
 *
 * ### Usage
 *
 * To show seconds column along with hours and minutes use `withSeconds` input
 *
 * ```html
 * <input [nbTimepicker]="timepicker">
 * <nb-timepicker #timepicker withSeconds></nb-timepicker>
 * ```
 * @stacked-example(Time picker with seconds, timepicker/timepicker-with-seconds.component)
 *
 * To force timepicker work in 12 hours format, use `twelveHoursFormat` input.
 * By default, timepicker choose 12 or 24 formats based on application locale standards
 *
 * ```html
 * <input [nbTimepicker]="timepicker" twelveHoursFormat>
 * <nb-timepicker #timepicker></nb-timepicker>
 * ```
 *
 * @stacked-example(Twelve hours format showcase, timepicker/timepicker-twelve-hours-format.component)
 *
 * A single column picker with options value as time and minute, so users won’t be able to pick
 * hours and minutes individually.
 * You can control options minutes offset via `step` input, e.g.: 11:00, 11:20, 11:40...'
 *
 * @stacked-example(Single column, timepicker/timepicker-single-column.component)
 *
 * Timepicker support forms and reactive forms API so you can provide value using `formControl` and `ngModel` directives
 * @stacked-example(Form control, timepicker/timepicker-form-control.component)
 *
 * <input [nbTimepicker]="timepicker" twelveHoursFormat>
 * <nb-timepicker #timepicke [formControl]="formControl"></nb-timepicker>
 *
 * @stacked-example(NgModel, timepicker/timepicker-ng-model.component)
 *
 * <input [nbTimepicker]="timepicker" twelveHoursFormat>
 * <nb-timepicker #timepicke [ngModel]="date"></nb-timepicker>
 *
 * You can provide localized versions of the timepicker text via the `localization` property of the config
 * object passed to the `forRoot` or `forChild` methods of the `NbTimepickerModule`:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTimepickerModule.forRoot({
 *       localization: {
 *         hoursText: 'Hr',
 *         minutesText: 'Min',
 *         secondsText: 'Sec',
 *         ampmText: 'Am/Pm',
 *       }
 *     }),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * @styles
 *
 * timepicker-cell-text-color:
 * timepicker-cell-hover-background-color:
 * timepicker-cell-hover-text-color:
 * timepicker-cell-focus-background-color:
 * timepicker-cell-focus-text-color:
 * timepicker-cell-active-background-color:
 * timepicker-cell-active-text-color:
 * timepicker-cell-text-font-size:
 * timepicker-cell-text-font-family:
 * timepicker-cell-text-line-height:
 * timepicker-cell-text-font-weight:
 * timepicker-cell-height:
 * timepicker-header-cell-text-color:
 * timepicker-header-cell-text-font-size:
 * timepicker-header-cell-text-font-family:
 * timepicker-header-cell-height:
 * timepicker-header-cell-text-line-height:
 * timepicker-header-cell-text-font-weight:
 * timepicker-border-color:
 * timepicker-border-style:
 * timepicker-border-width:
 * timepicker-scrollbar-color:
 * timepicker-scrollbar-background-color:
 * timepicker-scrollbar-width:
 * timepicker-single-column-width:
 * timepicker-multiple-column-width:
 * timepicker-title-height:
 * timepicker-title-padding:
 * timepicker-container-width:
 * timepicker-container-height:
 * */
@Directive({
    selector: 'input[nbTimepicker]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NbTimePickerDirective),
            multi: true,
        },
    ],
    standalone: false
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

    this.pickerInputsChangedSubscription?.unsubscribe();
    this.pickerInputsChangedSubscription = this._timePickerComponent.timepickerFormatChange$
      .pipe(
        map(() => this._timePickerComponent.computedTimeFormat),
        startWith(this._timePickerComponent.computedTimeFormat),
        distinctUntilChanged(),
        pairwise(),
        takeUntil(this.destroy$),
      )
      .subscribe(([prevFormat, nextFormat]) => {
        if (this.inputValue) {
          const date = this.dateService.parse(this.inputValue, prevFormat);
          this.writeValue(date);
        }
      });
  }
  protected _timePickerComponent: NbTimePickerComponent<D>;
  protected pickerInputsChangedSubscription: Subscription | undefined;

  /**
   * Time picker overlay offset.
   * */
  @Input() overlayOffset = 8;

  /**
   * String representation of latest selected date.
   * Updated when value is updated programmatically (writeValue), via timepicker (subscribeOnApplyClick)
   * or via input field (handleInputChange)
   * @docs-private
   */
  protected lastInputValue: string;
  /**
   * Positioning strategy used by overlay.
   * @docs-private
   * */
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected overlayRef: NbOverlayRef;
  protected destroy$: Subject<void> = new Subject<void>();
  protected onChange: (value: D) => void = () => {};
  protected onTouched = () => {};
  /**
   * Trigger strategy used by overlay.
   * @docs-private
   * */
  protected triggerStrategy: NbTriggerStrategy;

  /**
   * Returns html input element.
   * @docs-private
   * */
  get input(): HTMLInputElement {
    return this.hostRef.nativeElement;
  }

  /**
   * Determines is timepicker overlay opened.
   * @docs-private
   * */
  get isOpen(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  /**
   * Determines is timepicker overlay closed.
   * @docs-private
   * */
  get isClosed(): boolean {
    return !this.isOpen;
  }

  constructor(
    @Inject(NB_DOCUMENT) protected document,
    protected positionBuilder: NbPositionBuilderService,
    protected hostRef: ElementRef,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected overlay: NbOverlayService,
    protected cd: ChangeDetectorRef,
    protected calendarTimeModelService: NbCalendarTimeModelService<D>,
    protected dateService: NbDateService<D>,
    protected renderer: Renderer2,
    @Attribute('placeholder') protected placeholder: string,
  ) {}

  /**
   * Returns host input value.
   * @docs-private
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
      this.renderer.setProperty(this.input, 'placeholder', this.timepicker.computedTimeFormat);
    }
    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
    this.subscribeToBlur();
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
   * @docs-private
   * */
  protected attachToOverlay() {
    if (!this.overlayRef) {
      this.setupTimepicker();
      this.initOverlay();
    }
    this.overlayRef.attach(this.timepicker.portal);
  }

  setupTimepicker() {
    if (this.dateService.getId() === 'native' && isDevMode()) {
      console.warn(
        'Date.parse does not support parsing time with custom format.' +
          ' See details here https://akveo.github.io/nebular/docs/components/datepicker/overview#native-parse-issue',
      );
    }
    this.timepicker.setHost(this.hostRef);
    if (this.inputValue) {
      const val = this.dateService.getId() === 'native' ? this.parseNativeDateString(this.inputValue) : this.inputValue;
      this.timepicker.date = this.dateService.parse(val, this.timepicker.computedTimeFormat);
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
      const time = this.dateService.format(value.time, this.timepicker.computedTimeFormat).toUpperCase();
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
    this.overlayRef = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$.pipe(filter(() => this.isClosed)).subscribe(() => this.show());

    this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(() => {
      this.inputValue = this.lastInputValue || '';
      this.hide();
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
      .adjustment(NbAdjustment.COUNTERCLOCKWISE);
  }

  protected getContainer() {
    return (
      this.overlayRef &&
      this.isOpen &&
      <ComponentRef<any>>{
        location: {
          nativeElement: this.overlayRef.overlayElement,
        },
      }
    );
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

  protected subscribeToBlur() {
    merge(
      this.timepicker.blur,
      fromEvent(this.input, 'blur').pipe(filter(() => !this.isOpen && this.document.activeElement !== this.input)),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onTouched());
  }

  /**
   * Parses input value and write if it isn't null.
   * @docs-private
   * */
  protected handleInputChange(value: string) {
    if (this.dateService.getId() === 'native') {
      /**
       * Native date service dont parse only time string value,
       * and we adding year mouth and day to convert string to valid date format
       **/
      value = this.parseNativeDateString(value);
    }

    const isValidDate: boolean = this.dateService.isValidDateString(value, this.timepicker.computedTimeFormat);
    if (isValidDate) {
      this.lastInputValue = value;

      const date = this.dateService.parse(value, this.timepicker.computedTimeFormat);
      this.onChange(date);
      this.timepicker.date = date;
    }
  }

  protected updateValue(value: D) {
    if (value) {
      this.timepicker.date = value;

      const timeString = this.dateService.format(value, this.timepicker.computedTimeFormat).toUpperCase();
      this.inputValue = timeString;
      this.lastInputValue = timeString;
    }
  }

  writeValue(value: D): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (value: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }

  protected parseNativeDateString(value: string): string {
    const date = this.dateService.today();
    const year = this.dateService.getYear(date);
    const month = this.calendarTimeModelService.paddToTwoSymbols(this.dateService.getMonth(date));
    const day = this.calendarTimeModelService.paddToTwoSymbols(this.dateService.getDate(date));

    return `${year}-${month}-${day} ${value}`;
  }
}
