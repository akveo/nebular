/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnChanges,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Type,
  OnInit,
  SimpleChanges,
  Optional,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { NbComponentPortal, NbOverlayRef } from '../cdk/overlay/mapping';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbAdjustmentValues,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayService, patch } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarRange, NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarComponent } from '../calendar/calendar.component';
import {
  NbCalendarCell,
  NbCalendarSize,
  NbCalendarViewMode,
  NbCalendarSizeValues,
  NbCalendarViewModeValues,
} from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NB_DATE_SERVICE_OPTIONS, NbDatepicker, NbPickerValidatorConfig } from './datepicker.directive';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export abstract class NbBasePicker<D, T, P> extends NbDatepicker<T, D> {
  /**
   * Datepicker date format. Can be used only with date adapters (moment, date-fns) since native date
   * object doesn't support formatting.
   * */
  abstract format: string;

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  abstract boundingMonth: boolean;

  /**
   * Defines starting view for calendar.
   * */
  abstract startView: NbCalendarViewMode;

  /**
   * Minimum available date for selection.
   * */
  abstract min: D;

  /**
   * Maximum available date for selection.
   * */
  abstract max: D;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  abstract filter: (D) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  abstract dayCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  abstract monthCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  abstract yearCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  abstract size: NbCalendarSize;

  /**
   * Depending on this date a particular month is selected in the calendar
   */
  abstract visibleDate: D;

  /**
   * Hide picker when a date or a range is selected, `true` by default
   * @type {boolean}
   */
  abstract hideOnSelect: boolean;

  /**
   * Determines should we show calendar navigation or not.
   * @type {boolean}
   */
  abstract showNavigation: boolean;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  abstract weekNumberSymbol: string;

  /**
   * Determines should we show week numbers column.
   * False by default.
   * */
  abstract showWeekNumber: boolean;

  /**
   * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
   * `undefined` means that default locale setting will be used.
   * */
  abstract firstDayOfWeek: number | undefined;

  readonly formatChanged$: Subject<void> = new Subject();

  /**
   * Calendar component class that has to be instantiated inside overlay.
   * */
  protected abstract pickerClass: Type<P>;

  /**
   * Overlay reference object.
   * */
  protected ref: NbOverlayRef;

  /**
   * Datepicker container that contains instantiated picker.
   * */
  protected container: ComponentRef<NbDatepickerContainerComponent>;

  /**
   * Positioning strategy used by overlay.
   * */
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Trigger strategy used by overlay
   * */
  protected triggerStrategy: NbTriggerStrategy;

  /**
   * HTML input reference to which datepicker connected.
   * */
  protected hostRef: ElementRef;

  protected init$: ReplaySubject<void> = new ReplaySubject<void>();

  /**
   * Stream of picker changes. Required to be the subject because picker hides and shows and picker
   * change stream becomes recreated.
   * */
  protected onChange$: Subject<T> = new Subject();

  /**
   * Reference to the picker instance itself.
   * */
  protected pickerRef: ComponentRef<any>;

  protected overlayOffset = 8;

  protected adjustment: NbAdjustment = NbAdjustment.COUNTERCLOCKWISE;

  protected destroy$ = new Subject<void>();

  /**
   * Queue contains the last value that was applied to the picker when it was hidden.
   * This value will be passed to the picker as soon as it shown.
   * */
  protected queue: T | undefined;

  protected blur$: Subject<void> = new Subject<void>();

  protected constructor(
    protected overlay: NbOverlayService,
    protected positionBuilder: NbPositionBuilderService,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected cfr: ComponentFactoryResolver,
    protected dateService: NbDateService<D>,
    protected dateServiceOptions,
  ) {
    super();
  }

  /**
   * Returns picker instance.
   * */
  get picker(): any {
    return this.pickerRef && this.pickerRef.instance;
  }

  /**
   * Stream of picker value changes.
   * */
  get valueChange(): Observable<T> {
    return this.onChange$.asObservable();
  }

  get isShown(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  get init(): Observable<void> {
    return this.init$.asObservable();
  }

  /**
   * Emits when datepicker looses focus.
   */
  get blur(): Observable<void> {
    return this.blur$.asObservable();
  }

  protected abstract get pickerValueChange(): Observable<T>;

  /**
   * Datepicker knows nothing about host html input element.
   * So, attach method attaches datepicker to the host input element.
   * */
  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;
    this.subscribeOnTriggers();
  }

  getValidatorConfig(): NbPickerValidatorConfig<D> {
    return { min: this.min, max: this.max, filter: this.filter };
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    this.openDatepicker();
  }

  shouldHide(): boolean {
    return this.hideOnSelect && !!this.value;
  }

  hide() {
    if (this.ref) {
      this.ref.detach();
    }

    // save current value if picker was rendered
    if (this.picker) {
      this.queue = this.value;
      this.pickerRef.destroy();
      this.pickerRef = null;
      this.container = null;
    }
  }

  protected abstract writeQueue();

  protected createOverlay() {
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.subscribeOnPositionChange();
  }

  protected openDatepicker() {
    this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent, null, null, this.cfr));
    this.instantiatePicker();
    this.subscribeOnValueChange();
    this.writeQueue();
    this.patchWithInputs();
    this.pickerRef.changeDetectorRef.markForCheck();
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(this.overlayOffset)
      .adjustment(this.adjustment);
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.FOCUS)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.triggerStrategy.show$.subscribe(() => this.show());
    this.triggerStrategy.hide$.subscribe(() => {
      this.blur$.next();
      this.hide();
    });
  }

  protected instantiatePicker() {
    this.pickerRef = this.container.instance.attach(new NbComponentPortal(this.pickerClass, null, null, this.cfr));
  }

  /**
   * Subscribes on picker value changes and emit data through this.onChange$ subject.
   * */
  protected subscribeOnValueChange() {
    this.pickerValueChange.subscribe((date) => {
      this.onChange$.next(date);
    });
  }

  protected patchWithInputs() {
    this.picker.boundingMonth = this.boundingMonth;
    this.picker.startView = this.startView;
    this.picker.min = this.min;
    this.picker.max = this.max;
    this.picker.filter = this.filter;
    this.picker._cellComponent = this.dayCellComponent;
    this.picker._monthCellComponent = this.monthCellComponent;
    this.picker._yearCellComponent = this.yearCellComponent;
    this.picker.size = this.size;
    this.picker.showNavigation = this.showNavigation;
    this.picker.visibleDate = this.visibleDate;
    this.picker.showWeekNumber = this.showWeekNumber;
    this.picker.weekNumberSymbol = this.weekNumberSymbol;
    this.picker.firstDayOfWeek = this.firstDayOfWeek;
  }

  protected checkFormat() {
    if (this.dateService.getId() === 'native' && this.format) {
      throw new Error(
        "Can't format native date. To use custom formatting you have to install @nebular/moment or " +
          '@nebular/date-fns package and import NbMomentDateModule or NbDateFnsDateModule accordingly.' +
          'More information at "Formatting issue" ' +
          'https://akveo.github.io/nebular/docs/components/datepicker/overview#nbdatepickercomponent',
      );
    }

    const isFormatSet = this.format || (this.dateServiceOptions && this.dateServiceOptions.format);
    if (this.dateService.getId() === 'date-fns' && !isFormatSet) {
      throw new Error('format is required when using NbDateFnsDateModule');
    }
  }
}

@Component({
  template: '',
  standalone: false,
})
export class NbBasePickerComponent<D, T, P> extends NbBasePicker<D, T, P> implements OnInit, OnChanges, OnDestroy {
  /**
   * Datepicker date format. Can be used only with date adapters (moment, date-fns) since native date
   * object doesn't support formatting.
   * */
  @Input() format: string;

  /**
   * Defines if we should render previous and next months
   * in the current month view.
   * */
  @Input() boundingMonth: boolean = true;

  /**
   * Defines starting view for calendar.
   * */
  @Input() startView: NbCalendarViewMode = NbCalendarViewMode.DATE;
  static ngAcceptInputType_startView: NbCalendarViewModeValues;

  /**
   * Minimum available date for selection.
   * */
  @Input() min: D;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: D;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (D) => boolean;

  /**
   * Custom day cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() dayCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom month cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() monthCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Custom year cell component. Have to implement `NbCalendarCell` interface.
   * */
  @Input() yearCellComponent: Type<NbCalendarCell<D, T>>;

  /**
   * Size of the calendar and entire components.
   * Can be 'medium' which is default or 'large'.
   * */
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;

  /**
   * Depending on this date a particular month is selected in the calendar
   */
  @Input() visibleDate: D;

  /**
   * Hide picker when a date or a range is selected, `true` by default
   * @type {boolean}
   */
  @Input() hideOnSelect: boolean = true;

  /**
   * Determines should we show calendars navigation or not.
   * @type {boolean}
   */
  @Input() showNavigation: boolean = true;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string = '#';

  /**
   * Determines should we show week numbers column.
   * False by default.
   * */
  @Input()
  get showWeekNumber(): boolean {
    return this._showWeekNumber;
  }
  set showWeekNumber(value: boolean) {
    this._showWeekNumber = convertToBoolProperty(value);
  }
  protected _showWeekNumber: boolean = false;
  static ngAcceptInputType_showWeekNumber: NbBooleanInput;

  @Input() firstDayOfWeek: number | undefined;

  /**
   * Determines picker overlay offset (in pixels).
   * */
  @Input() overlayOffset = 8;

  @Input() adjustment: NbAdjustment = NbAdjustment.COUNTERCLOCKWISE;
  static ngAcceptInputType_adjustment: NbAdjustmentValues;

  constructor(
    @Inject(NB_DOCUMENT) document,
    positionBuilder: NbPositionBuilderService,
    triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    overlay: NbOverlayService,
    cfr: ComponentFactoryResolver,
    dateService: NbDateService<D>,
    @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) dateServiceOptions,
  ) {
    super(overlay, positionBuilder, triggerStrategyBuilder, cfr, dateService, dateServiceOptions);
  }

  ngOnInit() {
    this.checkFormat();
    this.init$.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.format) {
      if (!changes.format.isFirstChange()) {
        this.checkFormat();
      }
      this.formatChanged$.next();
    }
    if (this.picker) {
      this.patchWithInputs();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.hide();
    this.init$.complete();

    if (this.ref) {
      this.ref.dispose();
    }

    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  protected pickerClass: Type<P>;

  protected get pickerValueChange(): Observable<T> {
    return undefined;
  }

  get value(): T {
    return undefined;
  }
  set value(value: T) {}

  protected writeQueue() {}
}

/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
@Component({
  selector: 'nb-datepicker',
  template: '',
  standalone: false,
})
export class NbDatepickerComponent<D> extends NbBasePickerComponent<D, D, NbCalendarComponent<D>> {
  protected pickerClass: Type<NbCalendarComponent<D>> = NbCalendarComponent;

  /**
   * Date which will be rendered as selected.
   * */
  @Input() set date(date: D) {
    this.value = date;
  }

  /**
   * Emits date when selected.
   * */
  @Output() get dateChange(): EventEmitter<D> {
    return this.valueChange as EventEmitter<D>;
  }

  get value(): D {
    return this.picker ? this.picker.date : undefined;
  }

  set value(date: D) {
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

  protected get pickerValueChange(): Observable<D> {
    return this.picker.dateChange;
  }

  protected writeQueue() {
    if (this.queue) {
      const date = this.queue;
      this.queue = null;
      this.value = date;
    }
  }
}

/**
 * The RangeDatePicker components itself.
 * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
 */
@Component({
  selector: 'nb-rangepicker',
  template: '',
  standalone: false,
})
export class NbRangepickerComponent<D> extends NbBasePickerComponent<
  D,
  NbCalendarRange<D>,
  NbCalendarRangeComponent<D>
> {
  protected pickerClass: Type<NbCalendarRangeComponent<D>> = NbCalendarRangeComponent;

  /**
   * Range which will be rendered as selected.
   * */
  @Input() set range(range: NbCalendarRange<D>) {
    this.value = range;
  }

  /**
   * Emits range when start selected and emits again when end selected.
   * */
  @Output() get rangeChange(): EventEmitter<NbCalendarRange<D>> {
    return this.valueChange as EventEmitter<NbCalendarRange<D>>;
  }

  get value(): NbCalendarRange<D> {
    return this.picker ? this.picker.range : undefined;
  }

  set value(range: NbCalendarRange<D>) {
    if (!this.picker) {
      this.queue = range;
      return;
    }

    if (range) {
      const visibleDate = range && range.start;
      this.visibleDate = visibleDate;
      this.picker.visibleDate = visibleDate;
      this.picker.range = range;
    }
  }

  protected get pickerValueChange(): Observable<NbCalendarRange<D>> {
    return this.picker.rangeChange;
  }

  shouldHide(): boolean {
    return super.shouldHide() && !!(this.value && this.value.start && this.value.end);
  }

  protected writeQueue() {
    if (this.queue) {
      const range = this.queue;
      this.queue = null;
      this.value = range;
    }
  }
}
