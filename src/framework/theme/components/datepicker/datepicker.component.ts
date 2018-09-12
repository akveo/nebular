/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ElementRef, Inject, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { NbDatepicker } from './datepicker';
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
import { Observable, Subject } from 'rxjs';
import { Type } from '@angular/core/src/type';


export abstract class NbBasePicker<T, P> extends NbDatepicker<T> implements OnDestroy {
  protected abstract pickerClass: Type<P>;
  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbDatepickerContainerComponent>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected hostRef: ElementRef;
  protected onChange$: Subject<T> = new Subject();
  protected pickerRef: ComponentRef<P>;
  protected alive: boolean = true;
  protected queue: T;

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService) {
    super();
  }

  protected abstract get pickerValueChange(): Observable<T>;

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    this.ref.dispose();
  }

  get picker(): P {
    return this.pickerRef.instance;
  }

  get valueChange(): Observable<T> {
    return this.onChange$.asObservable();
  }

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
  }

  hide() {
    this.ref.detach();
    this.container = null;
  }

  toggle() {
    if (this.ref && this.ref.hasAttached()) {
      this.hide();
    } else {
      this.show();
    }
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
export class NbDatepickerComponent extends NbBasePicker<Date, NbCalendarComponent> {
  protected pickerClass: Type<NbCalendarComponent> = NbCalendarComponent;

  get value(): Date {
    return this.picker.date;
  }

  set value(date: Date) {
    this.picker.date = date;
  }

  protected get pickerValueChange(): Observable<Date> {
    return this.picker.dateChange;
  }
}

@Component({
  selector: 'nb-rangepicker',
  template: '',
})
export class NbRangepickerComponent extends NbBasePicker<NbCalendarRange, NbCalendarRangeComponent> {
  protected pickerClass: Type<NbCalendarRangeComponent> = NbCalendarRangeComponent;

  get value(): NbCalendarRange {
    return this.picker.range;
  }

  set value(range: NbCalendarRange) {
    this.picker.range = range;
  }

  protected get pickerValueChange(): Observable<NbCalendarRange> {
    return this.picker.rangeChange;
  }
}
