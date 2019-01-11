import { ComponentFactoryResolver, ComponentRef, ElementRef, Injectable, Type } from '@angular/core';
import { takeUntil, takeWhile, skip } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from './overlay-trigger';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from './overlay-position';

import { NbRenderableContainer } from './overlay-container';
import { createContainer, NbOverlayContent, NbOverlayService, patch } from './overlay';
import { NbOverlayRef } from './mapping';

interface NbSuperOverlayChange {
  [propName: string]: any;
}


@Injectable()
export class NbSuperOverlay {

  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbRenderableContainer>;
  protected componentFactoryResolver: ComponentFactoryResolver;
  protected componentType: Type<NbRenderableContainer>;
  protected context: Object = {};
  protected content: NbOverlayContent;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  protected positionStrategyChange$ = new Subject();
  protected alive = true;

  get isAttached(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  constructor(private overlay: NbOverlayService) {
  }


  create(componentType: Type<NbRenderableContainer>,
         componentFactoryResolver: ComponentFactoryResolver,
         content: NbOverlayContent,
         context: Object,
         positionStrategy: NbAdjustableConnectedPositionStrategy) {

    this.setContext(context);
    this.setContent(content);
    this.setComponent(componentType, componentFactoryResolver);
    this.setPositionStrategy(positionStrategy);

    return this;
  }

  // TODO: something about schedule
  setContent(content: NbOverlayContent) {
   this.content = content;

    if (this.container) {
      this.updateContext();
    }
  }

  setContext(context: Object) {
    this.context = context;

    if (this.container) {
      this.updateContext();
    }
  }

  setComponent(componentType: Type<NbRenderableContainer>, componentFactoryResolver: ComponentFactoryResolver) {
    this.componentType = componentType;
    this.componentFactoryResolver = componentFactoryResolver;

    // in case the component is shown we recreate it and show it back
    if (this.ref && this.isAttached) {
      this.dispose();
      this.show();
    } else if (this.ref && !this.isAttached) {
      this.dispose();
    }
  }

  setPositionStrategy(positionStrategy: NbAdjustableConnectedPositionStrategy) {
    this.positionStrategyChange$.next();

    this.positionStrategy = positionStrategy;

    if (this.ref) {
      this.ref.updatePositionStrategy(this.positionStrategy);
    }

    this.positionStrategy.positionChange
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.positionStrategyChange$.pipe(skip(1))),
      )
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    this.renderContainer();
  }

  hide() {
    if (!this.ref) {
      return;
    }

    this.ref.detach();
    this.container = null;
  }

  toggle() {
    if (this.isAttached) {
      this.hide();
    } else {
      this.show();
    }
  }

  dispose() {
    this.alive = false;
    this.hide();
    if (this.ref) {
      this.ref.dispose();
      this.ref = null;
    }
  }

  getContainer() {
    return this.container;
  }

  protected createOverlay() {
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  protected renderContainer() {
    const containerContext = this.createContainerContext();
    this.container = createContainer(this.ref, this.componentType, containerContext, this.componentFactoryResolver);
    this.container.instance.renderContent();
  }

  protected createContainerContext(): Object {
    return {
      content: this.content,
      context: this.context,
      cfr: this.componentFactoryResolver,
    };
  }

  protected updateContext() {
    const containerContext = this.createContainerContext();
    Object.assign(this.container.instance, containerContext);
    this.container.instance.renderContent();
    this.container.changeDetectorRef.detectChanges();

    /**
     * Dimensions of the container may be changed after updating the content, so, we have to update
     * container position.
     * */
    this.ref.updatePosition();
  }
}



@Injectable()
export class NbSuperOverlayBuilder {

  protected _componentFactoryResolver: ComponentFactoryResolver;
  protected _componentType: any;
  protected _host: ElementRef;
  protected _context: Object = {};
  protected _content: NbOverlayContent;
  protected _trigger: NbTrigger = NbTrigger.NOOP;
  protected _position: NbPosition = NbPosition.TOP;
  protected _adjustment: NbAdjustment = NbAdjustment.NOOP;

  protected superOverlay: NbSuperOverlay;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected triggerStrategyChange$ = new Subject();

  protected alive = true;
  protected changes: NbSuperOverlayChange = {};

  protected built = false;

  constructor(private positionBuilder: NbPositionBuilderService,
              private triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              private superOverlayService: NbSuperOverlay) {
  }


  destroy() {
    this.alive = false;

    // this.dispose();
  }

  // TODO: what do we need to UPDATE?
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

  // TODO: type of component class
  componentType(componentType: any, componentFactoryResolver: ComponentFactoryResolver) {
    this.collectChanges('_componentType', componentType);
    this.collectChanges('_componentFactoryResolver', componentFactoryResolver);
    return this;
  }

  content(content: any) {
    this.collectChanges('_content', content);
    return this;
  }

  context(context: any) {
    this.collectChanges('_context', context);
    return this;
  }

  build() {
    this.superOverlay = this.superOverlayService.create(
      this._componentType,
      this._componentFactoryResolver,
      this._content,
      this._context,
      this.createPositionStrategy());

    this.subscribeOnTriggers(this.superOverlay);
    this.clearChanges();


    this.built = true;
    return this.superOverlay;
  }

  rebuild() {

    if (!this.built) {
      return;
    }

    /**
     * In case there is a new component we may need to rebuild everything
     * And hence there is no sense to check other properties
     */
    if (this.isComponentTypeUpdateRequired(this.changes)) {
      this.superOverlay.setComponent(this._componentType, this._componentFactoryResolver);
    }

    if (this.isPositionStrategyUpdateRequired(this.changes)) {
      this.superOverlay.setPositionStrategy(this.createPositionStrategy());
    }

    if (this.isTriggerStrategyUpdateRequired(this.changes)) {
      this.subscribeOnTriggers(this.superOverlay);
    }

    if (this.isContainerRerenderRequired(this.changes)) {
      this.superOverlay.setContext(this._context);
      this.superOverlay.setContent(this._content);
    }

    this.clearChanges();
    return this.superOverlay;
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

  protected createPositionStrategy() {
    return this.positionBuilder
      .connectedTo(this._host)
      .position(this._position)
      .adjustment(this._adjustment);
  }

  protected subscribeOnTriggers(superOverlay: NbSuperOverlay) {
    this.triggerStrategyChange$.next();

    const triggerStrategy: NbTriggerStrategy = this.triggerStrategyBuilder
      .trigger(this._trigger)
      .host(this._host.nativeElement)
      .container(() => superOverlay.getContainer())
      .build();

    triggerStrategy.show$.pipe(
      takeWhile(() => this.alive),
      takeUntil(this.triggerStrategyChange$.pipe(skip(1))),
    )
      .subscribe(() => superOverlay.show());

    triggerStrategy.hide$.pipe(
      takeWhile(() => this.alive),
      takeUntil(this.triggerStrategyChange$.pipe(skip(1))),
    )
      .subscribe(() => superOverlay.hide());
  }

  protected isContainerRerenderRequired(changes: NbSuperOverlayChange) {
    return this.isContentUpdateRequired(changes)
      || this.isContextUpdateRequired(changes)
      || this.isPositionStrategyUpdateRequired(changes);
  }

  protected isContentUpdateRequired(changes: NbSuperOverlayChange): boolean {
    return !!changes._content;
  }

  protected isContextUpdateRequired(changes: NbSuperOverlayChange): boolean {
    return !!changes._context;
  }

  protected isPositionStrategyUpdateRequired(changes: NbSuperOverlayChange): boolean {
    return !!changes._adjustment || !!changes._position;
  }

  protected isTriggerStrategyUpdateRequired(changes: NbSuperOverlayChange): boolean {
    return !!changes._trigger;
  }

  protected isComponentTypeUpdateRequired(changes: NbSuperOverlayChange): boolean {
    return !!changes._componentType || !!changes._componentFactoryResolver;
  }
}
