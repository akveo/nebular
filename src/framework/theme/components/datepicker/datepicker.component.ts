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


export abstract class NbBasePicker<T> extends NbDatepicker<T> implements OnDestroy {
  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbDatepickerContainerComponent>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected hostRef: ElementRef;
  protected alive: boolean = true;

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService) {
    super();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    this.ref.dispose();
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
}


@Component({
  selector: 'nb-datepicker',
  template: '',
})
export class NbDatepickerComponent extends NbBasePicker<Date> {
  protected calendar: NbCalendarComponent;
  protected onChange$: Subject<Date> = new Subject();

  show() {
    super.show();
    this.instantiateCalendar();
    this.subscribeOnDateChange();
  }

  hide() {
    super.hide();
    this.calendar = null;
  }

  getValue(): Date {
    return this.calendar.date;
  }

  onChange(): Observable<Date> {
    return this.onChange$.asObservable();
  }

  setValue(date: Date): void {
    this.calendar.date = date;
  }

  protected instantiateCalendar() {
    this.calendar = this.container.instance.attach(new NbComponentPortal(NbCalendarComponent)).instance;
  }

  protected subscribeOnDateChange() {
    this.calendar.dateChange.subscribe(date => {
      this.onChange$.next(date);
    });
  }
}

@Component({
  selector: 'nb-rangepicker',
  template: '',
})
export class NbRangepickerComponent extends NbBasePicker<NbCalendarRange> {
  protected calendar: NbCalendarRangeComponent;
  protected onChange$: Subject<NbCalendarRange> = new Subject();

  show() {
    super.show();
    this.instantiateCalendar();
    this.subscribeOnDateChange();
  }

  hide() {
    super.hide();
    this.calendar = null;
  }

  getValue(): NbCalendarRange {
    return this.calendar.range;
  }

  onChange(): Observable<NbCalendarRange> {
    return this.onChange$.asObservable();
  }

  setValue(range: NbCalendarRange): void {
    this.calendar.range = range;
  }

  protected instantiateCalendar() {
    this.calendar = this.container.instance.attach(new NbComponentPortal(NbCalendarRangeComponent)).instance;
  }

  protected subscribeOnDateChange() {
    this.calendar.rangeChange.subscribe(date => {
      this.onChange$.next(date);
    });
  }
}
