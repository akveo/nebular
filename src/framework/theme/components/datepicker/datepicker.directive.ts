/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, ComponentRef, Directive, ElementRef, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeWhile } from 'rxjs/operators';

import {
  createContainer,
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
  patch,
} from '../cdk';
import { NbPopoverComponent } from '../popover/popover.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarComponent } from '../calendar/calendar.component';


const NB_DATE_FORMAT = new InjectionToken('date format');

@Directive({ selector: 'input[nbDatepicker]', providers: [DatePipe] })
export class NbDatepickerDirective implements AfterViewInit, OnDestroy {

  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbPopoverComponent>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected triggerStrategy: NbTriggerStrategy;
  protected alive: boolean = true;

  protected selectedDate: Date;

  protected get calendar(): NbCalendarComponent {
    return this.container.instance.content;
  }

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService,
              protected datePipe: DatePipe) {
  }

  ngAfterViewInit() {
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.triggerStrategy = this.createTriggerStrategy();

    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
  }

  show() {
    this.container = createContainer(this.ref, NbPopoverComponent, {
      position: NbPosition.BOTTOM,
      content: NbCalendarComponent,
    });
    this.calendar.date = new Date();
    this.selectedDate = this.calendar.date;
    this.calendar.dateChange.subscribe(date => {
      this.selectedDate = date;
      this.hostRef.nativeElement.value = this.datePipe.transform(this.calendar)
    });
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

  protected createTriggerStrategy(): NbTriggerStrategy {
    return new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$.pipe(takeWhile(() => this.alive)).subscribe(() => this.show());
    this.triggerStrategy.hide$.pipe(takeWhile(() => this.alive)).subscribe(() => this.hide());
  }
}
