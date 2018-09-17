/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Type,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbComponentPortal,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
  patch,
} from '../cdk';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarRange, NbCalendarRangeComponent } from '../calendar/calendar-range.component'
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode } from '../calendar-kit';
import { NbDatepicker, NbPickerValidatorConfig } from './datepicker.directive';


/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export abstract class NbBasePicker<D, T, P> extends NbDatepicker<T> implements OnDestroy {
  /**
   * Datepicker date format.
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

  @Input() visibleDate: D;

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
   * HTML input reference to which datepicker connected.
   * */
  protected hostRef: ElementRef;

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
  protected queue: T;

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService) {
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

  protected abstract get pickerValueChange(): Observable<T>;

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    this.ref.dispose();
  }

  /**
   * Datepicker knows nothing about host html input element.
   * So, attach method attaches datepicker to the host input element.
   * */
  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;

    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.subscribeOnPositionChange();
    this.subscribeOnTriggers();
  }

  getValidatorConfig(): NbPickerValidatorConfig<T> {
    return { min: this.min, max: this.max, filter: this.filter };
  }

  show() {
    this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent));
    this.instantiatePicker();
    this.subscribeOnValueChange();
    this.writeQueue();
    this.patchWithInputs();
  }

  hide() {
    this.queue = this.value;
    this.ref.detach();
    this.container = null;
    this.pickerRef.destroy();
    this.pickerRef = null;
  }

  protected abstract writeQueue();

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
    return new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected subscribeOnTriggers() {
    const triggerStrategy = this.createTriggerStrategy();
    triggerStrategy.show$.pipe(takeWhile(() => this.alive)).subscribe(() => this.show());
    triggerStrategy.hide$.pipe(takeWhile(() => this.alive)).subscribe(() => this.hide());

    fromEvent(this.hostRef.nativeElement, 'focus')
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.show());
  }

  protected instantiatePicker() {
    this.pickerRef = this.container.instance.attach(new NbComponentPortal(this.pickerClass));
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
    this.picker.dayCellComponent = this.dayCellComponent;
    this.picker.monthCellComponent = this.monthCellComponent;
    this.picker.yearCellComponent = this.yearCellComponent;
    this.picker.size = this.size;
    this.picker.visibleDate = this.visibleDate;
  }
}


/**
 * The `NbDatepickerComponent` is basic picker implementation for dates.
 * */
@Component({
  selector: 'nb-datepicker',
  template: '',
})
export class NbDatepickerComponent<D> extends NbBasePicker<D, D, NbCalendarComponent<D>> {
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
    return this.picker.date;
  }

  set value(date: D) {
    if (!this.picker) {
      this.queue = date;
      return;
    }

    if (date) {
      this.picker.visibleDate = date;
      this.picker.date = date;
    }
  }

  protected get pickerValueChange(): Observable<D> {
    return this.picker.dateChange;
  }

  protected writeQueue() {
    this.value = this.queue;
  }
}

/**
 * The `NbDatepickerComponent` is basic picker implementation for ranges.
 * */
@Component({
  selector: 'nb-rangepicker',
  template: '',
})
export class NbRangepickerComponent<D> extends NbBasePicker<D, NbCalendarRange<D>, NbCalendarRangeComponent<D>> {
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
    return this.picker.range;
  }

  set value(range: NbCalendarRange<D>) {
    if (!this.picker) {
      this.queue = range;
      return;
    }

    if (range) {
      this.picker.visibleDate = range && range.start;
      this.picker.range = range;
    }
  }

  protected get pickerValueChange(): Observable<NbCalendarRange<D>> {
    return this.picker.rangeChange;
  }

  protected writeQueue() {
    this.value = this.queue;
  }
}
