import { ComponentFactoryResolver, ElementRef, Injectable, Type } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../overlay-trigger';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../overlay-position';
import { NbRenderableContainer } from '../overlay-container';
import { NbOverlayContent } from '../overlay';
import { NbDynamicOverlay } from './dynamic-overlay';


interface NbDynamicOverlayChange {
  [propName: string]: any;
}

@Injectable()
export class NbDynamicOverlayHandler {

  protected _componentFactoryResolver: ComponentFactoryResolver;
  protected _componentType: Type<NbRenderableContainer>;
  protected _host: ElementRef;
  protected _context: Object = {};
  protected _content: NbOverlayContent;
  protected _trigger: NbTrigger = NbTrigger.NOOP;
  protected _position: NbPosition = NbPosition.TOP;
  protected _adjustment: NbAdjustment = NbAdjustment.NOOP;

  protected dynamicOverlay: NbDynamicOverlay;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected disconnect$ = new Subject();

  protected changes: NbDynamicOverlayChange = {};

  constructor(private positionBuilder: NbPositionBuilderService,
              private triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              private dynamicOverlayService: NbDynamicOverlay) {
  }

  host(host: ElementRef) {
    this.collectChanges('_host', host);
    return this;
  }

  trigger(trigger: NbTrigger) {
    this.collectChanges('_trigger', trigger);
    return this;
  }

  position(position: NbPosition) {
    this.collectChanges('_position', position);
    return this;
  }

  adjustment(adjustment: NbAdjustment) {
    this.collectChanges('_adjustment', adjustment);
    return this;
  }

  componentType(componentType: Type<NbRenderableContainer>, componentFactoryResolver: ComponentFactoryResolver) {
    this.collectChanges('_componentType', componentType);
    this.collectChanges('_componentFactoryResolver', componentFactoryResolver);
    return this;
  }

  content(content: NbOverlayContent) {
    this.collectChanges('_content', content);
    return this;
  }

  context(context: {}) {
    this.collectChanges('_context', context);
    return this;
  }

  build() {
    this.dynamicOverlay = this.dynamicOverlayService.create(
      this._componentType,
      this._componentFactoryResolver,
      this._content,
      this._context,
      this.createPositionStrategy());

    this.connect();
    this.clearChanges();

    return this.dynamicOverlay;
  }

  rebuild() {
    if (!this.dynamicOverlay) {
      return;
    }

    if (this.isPositionStrategyUpdateRequired(this.changes)) {
      this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy());
    }

    if (this.isTriggerStrategyUpdateRequired(this.changes)) {
      this.connect();
    }

    if (this.isContainerRerenderRequired(this.changes)) {
      this.dynamicOverlay.setContext(this._context);
      this.dynamicOverlay.setContent(this._content);
    }

    if (this.isComponentTypeUpdateRequired(this.changes)) {
      this.dynamicOverlay.setComponent(this._componentType, this._componentFactoryResolver);
    }

    this.clearChanges();
    return this.dynamicOverlay;
  }

  connect() {
    if (!this.dynamicOverlay) {
      throw new Error(`NbDynamicOverlayHandler: cannot connect to DynamicOverlay
      as it is not created yet. Call build() first`);
    }
    this.disconnect();
    this.subscribeOnTriggers(this.dynamicOverlay);
  }

  disconnect() {
    this.disconnect$.next();
  }

  destroy() {
    this.disconnect();
    this.clearChanges();
    if (this.dynamicOverlay) {
      this.dynamicOverlay.dispose();
    }
  }

  protected createPositionStrategy() {
    return this.positionBuilder
      .connectedTo(this._host)
      .position(this._position)
      .adjustment(this._adjustment);
  }

  protected subscribeOnTriggers(dynamicOverlay: NbDynamicOverlay) {

    const triggerStrategy: NbTriggerStrategy = this.triggerStrategyBuilder
      .trigger(this._trigger)
      .host(this._host.nativeElement)
      .container(() => dynamicOverlay.getContainer())
      .build();

    triggerStrategy.show$.pipe(
      takeUntil(this.disconnect$),
    )
      .subscribe(() => dynamicOverlay.show());

    triggerStrategy.hide$.pipe(
      takeUntil(this.disconnect$),
    )
      .subscribe(() => dynamicOverlay.hide());
  }

  protected isContainerRerenderRequired(changes: NbDynamicOverlayChange) {
    return this.isContentUpdateRequired(changes)
      || this.isContextUpdateRequired(changes)
      || this.isPositionStrategyUpdateRequired(changes);
  }

  protected isContentUpdateRequired(changes: NbDynamicOverlayChange): boolean {
    return !!changes._content;
  }

  protected isContextUpdateRequired(changes: NbDynamicOverlayChange): boolean {
    return !!changes._context;
  }

  protected isPositionStrategyUpdateRequired(changes: NbDynamicOverlayChange): boolean {
    return !!changes._adjustment || !!changes._position || !!changes._host;
  }

  protected isTriggerStrategyUpdateRequired(changes: NbDynamicOverlayChange): boolean {
    return !!changes._trigger || !!changes._host;
  }

  protected isComponentTypeUpdateRequired(changes: NbDynamicOverlayChange): boolean {
    return !!changes._componentType || !!changes._componentFactoryResolver;
  }

  protected collectChanges(key: string, newValue: any) {
    if (this[key] !== newValue) {
      this.changes[key] = newValue;
    }

    this[key] = newValue;
  }

  protected clearChanges() {
    this.changes = {};
  }
}
