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
  AfterViewInit,
  OnInit,
  SimpleChanges,
  Optional,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { NbComponentPortal, NbOverlayRef } from '../cdk/overlay/mapping';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayService, patch } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarRange, NbCalendarRangeComponent } from '../calendar/calendar-range.component'
import { NbCalendarComponent } from '../calendar/calendar.component';
import {
  NbCalendarCell,
  NbCalendarSize,
  NbCalendarViewMode,
} from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NB_DATE_SERVICE_OPTIONS, NbDatepicker, NbPickerValidatorConfig } from './datepicker.directive';
import { convertToBoolProperty } from '../helpers';


/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export abstract class NbBasePicker<D, T, P>
                extends NbDatepicker<T>
                implements OnInit, OnChanges, AfterViewInit, OnDestroy {
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
  abstract min: T;

  /**
   * Maximum available date for selection.
   * */
  abstract max: T;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  abstract filter: (T) => boolean;

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
  abstract size: NbCalendarSize = NbCalendarSize.MEDIUM;

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
   * Determines should we show calendars header or not.
   * @type {boolean}
   */
  abstract showHeader: boolean;

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

  protected alive: boolean = true;

  /**
   * Queue contains the last value that was applied to the picker when it was hidden.
   * This value will be passed to the picker as soon as it shown.
   * */
  protected queue: T | undefined;

  protected blur$: Subject<void> = new Subject<void>();

  protected constructor(protected overlay: NbOverlayService,
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

  ngOnInit() {
    this.checkFormat();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.format && !changes.format.isFirstChange()) {
      this.checkFormat();
    }
  }

  ngAfterViewInit() {
    this.init$.next();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    this.init$.complete();

    if (this.ref) {
      this.ref.dispose();
    }

    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  /**
   * Datepicker knows nothing about host html input element.
   * So, attach method attaches datepicker to the host input element.
   * */
  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;
    this.subscribeOnTriggers();
  }

  getValidatorConfig(): NbPickerValidatorConfig<T> {
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
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.COUNTERCLOCKWISE);
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
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
    this.pickerValueChange.subscribe(date => {
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
    this.picker.monthCellComponent = this.monthCellComponent;
    this.picker._yearCellComponent = this.yearCellComponent;
    this.picker.size = this.size;
    this.picker.showHeader = this.showHeader;
    this.picker.visibleDate = this.visibleDate;
    this.picker.showWeekNumber = this.showWeekNumber;
    this.picker.weekNumberSymbol = this.weekNumberSymbol;
  }

  protected checkFormat() {
    if (this.dateService.getId() === 'native' && this.format) {
      throw new Error('Can\'t format native date. To use custom formatting you have to install @nebular/moment or ' +
        '@nebular/date-fns package and import NbMomentDateModule or NbDateFnsDateModule accordingly.' +
        'More information at "Formatting issue" ' +
        'https://akveo.github.io/nebular/docs/components/datepicker/overview#nbdatepickercomponent');
    }

    const isFormatSet = this.format || (this.dateServiceOptions && this.dateServiceOptions.format);
    if (this.dateService.getId() === 'date-fns' && !isFormatSet) {
      throw new Error('format is required when using NbDateFnsDateModule');
    }
  }
}

@Component({
  template: '',
})
export class NbBasePickerComponent<D, T, P> extends NbBasePicker<D, T, P> {

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

  /**
   * Minimum available date for selection.
   * */
  @Input() min: T;

  /**
   * Maximum available date for selection.
   * */
  @Input() max: T;

  /**
   * Predicate that decides which cells will be disabled.
   * */
  @Input() filter: (T) => boolean;

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
   * Determines should we show calendars header or not.
   * @type {boolean}
   */
  @Input() showHeader: boolean = true;

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

  constructor(@Inject(NB_DOCUMENT) document,
              positionBuilder: NbPositionBuilderService,
              triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              overlay: NbOverlayService,
              cfr: ComponentFactoryResolver,
              dateService: NbDateService<D>,
              @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) dateServiceOptions,
  ) {
    super(overlay, positionBuilder, triggerStrategyBuilder, cfr, dateService, dateServiceOptions);
  }

  protected pickerClass: Type<P>;

  protected get pickerValueChange(): Observable<T> {
    return
  }

  get value(): T | undefined {
    return undefined;
  }
  set value(value: T) {}

  protected writeQueue() {
  }
}

/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
@Component({
  selector: 'nb-datepicker',
  template: '',
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

  get value(): D | undefined {
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
})
export class NbRangepickerComponent<D>
       extends NbBasePickerComponent<D, NbCalendarRange<D>, NbCalendarRangeComponent<D>> {
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

  get value(): NbCalendarRange<D> | undefined {
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
