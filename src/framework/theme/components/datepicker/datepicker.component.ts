/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { takeWhile } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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


export abstract class NbDatepicker<T> {
  @Input() format: string;

  abstract get value(): T;

  abstract set value(value: T);

  abstract get valueChange(): Observable<T>;

  abstract attach(hostRef: ElementRef);
}

/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export abstract class NbBasePicker<T, P> extends NbDatepicker<T> implements OnDestroy {
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
  protected pickerRef: ComponentRef<P>;

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
  get picker(): P {
    return this.pickerRef && this.pickerRef.instance;
  }

  /**
   * Stream of picker value changes.
   * */
  get valueChange(): Observable<T> {
    return this.onChange$.asObservable();
  }

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

  show() {
    this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent));
    this.instantiatePicker();
    this.subscribeOnValueChange();
    this.writeQueue();
  }

  hide() {
    this.queue = this.value;
    this.ref.detach();
    this.container = null;
    this.pickerRef.destroy();
    this.pickerRef = null;
  }

  protected abstract writeQueue();

  protected abstract get pickerValueChange(): Observable<T>;

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
}


@Component({
  selector: 'nb-datepicker',
  template: '',
})
export class NbDatepickerComponent<D> extends NbBasePicker<D, NbCalendarComponent<D>> {
  protected pickerClass: Type<NbCalendarComponent<D>> = NbCalendarComponent;

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

@Component({
  selector: 'nb-rangepicker',
  template: '',
})
export class NbRangepickerComponent<D> extends NbBasePicker<NbCalendarRange<D>, NbCalendarRangeComponent<D>> {
  protected pickerClass: Type<NbCalendarRangeComponent<D>> = NbCalendarRangeComponent;

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
