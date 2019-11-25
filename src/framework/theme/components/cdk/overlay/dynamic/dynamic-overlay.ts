import { ComponentFactoryResolver, ComponentRef, Injectable, NgZone, Type } from '@angular/core';
import { filter, takeUntil, takeWhile, distinctUntilChanged } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import {
  NbAdjustableConnectedPositionStrategy,
  NbPosition,
} from '../overlay-position';

import { NbRenderableContainer } from '../overlay-container';
import { createContainer, NbOverlayContent, NbOverlayService, patch } from '../overlay-service';
import { NbOverlayRef, NbOverlayContainer, NbOverlayConfig } from '../mapping';

export interface NbDynamicOverlayController {
  show();
  hide();
  toggle();
  rebuild();
}

@Injectable()
export class NbDynamicOverlay {

  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbRenderableContainer>;
  protected componentType: Type<NbRenderableContainer>;
  protected context: Object = {};
  protected content: NbOverlayContent;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected overlayConfig: NbOverlayConfig = {};
  protected lastAppliedPosition: NbPosition;

  protected positionStrategyChange$ = new Subject();
  protected isShown$ = new BehaviorSubject<boolean>(false);
  protected alive = true;

  get isAttached(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  get isShown(): Observable<boolean> {
    return this.isShown$.pipe(distinctUntilChanged());
  }

  constructor(
    protected overlay: NbOverlayService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected zone: NgZone,
    protected overlayContainer: NbOverlayContainer) {
  }

  create(componentType: Type<NbRenderableContainer>,
         content: NbOverlayContent,
         context: Object,
         positionStrategy: NbAdjustableConnectedPositionStrategy,
         overlayConfig: NbOverlayConfig = {}) {

    this.setContentAndContext(content, context);
    this.setComponent(componentType);
    this.setPositionStrategy(positionStrategy);
    this.setOverlayConfig(overlayConfig);

    return this;
  }

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

  setContentAndContext(content: NbOverlayContent, context: Object) {
    this.content = content;
    this.context = context;
    if (this.container) {
      this.updateContext();
    }
  }

  setComponent(componentType: Type<NbRenderableContainer>) {
    this.componentType = componentType;

    // in case the component is shown we recreate it and show it back
    const wasAttached = this.isAttached;
    this.disposeOverlayRef();
    if (wasAttached) {
      this.show();
    }
  }

  setPositionStrategy(positionStrategy: NbAdjustableConnectedPositionStrategy) {
    this.positionStrategyChange$.next();

    this.positionStrategy = positionStrategy;

    this.positionStrategy.positionChange
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.positionStrategyChange$),
        filter(() => !!this.container),
      )
      .subscribe((position: NbPosition) => {
        this.lastAppliedPosition = position;
        patch(this.container, { position });
      });

    if (this.ref) {
      this.ref.updatePositionStrategy(this.positionStrategy);
    }
  }

  setOverlayConfig(overlayConfig: NbOverlayConfig) {
    this.overlayConfig = overlayConfig;

    const wasAttached = this.isAttached;
    this.disposeOverlayRef();
    if (wasAttached) {
      this.show();
    }
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    this.renderContainer();

    if (!this.hasOverlayInContainer()) {
      // Dispose overlay ref as it refers to the old overlay container and create new by calling `show`
      this.disposeOverlayRef();
      return this.show();
    }

    this.isShown$.next(true);
  }

  hide() {
    if (!this.ref) {
      return;
    }

    this.ref.detach();
    this.container = null;

    this.isShown$.next(false);
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
    this.disposeOverlayRef();
    this.isShown$.complete();
    this.positionStrategyChange$.complete();
  }

  getContainer() {
    return this.container;
  }

  protected createOverlay() {
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      ...this.overlayConfig,
    });
    this.updatePositionWhenStable();
  }

  protected renderContainer() {
    const containerContext = this.createContainerContext();
    if (!this.container) {
      this.container = createContainer(this.ref, this.componentType, containerContext, this.componentFactoryResolver);
    }
    this.container.instance.renderContent();
  }

  protected updateContext() {
    const containerContext = this.createContainerContext();
    Object.assign(this.container.instance, containerContext);
    this.container.instance.renderContent();
    this.container.changeDetectorRef.detectChanges();
  }

  protected createContainerContext(): Object {
    return {
      content: this.content,
      context: this.context,
      cfr: this.componentFactoryResolver,
      position: this.lastAppliedPosition,
    };
  }

  /**
   * Dimensions of the container may change after content update. So we listen to zone.stable event to
   * reposition the container.
   */
  protected updatePositionWhenStable() {
    this.zone.onStable
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.ref && this.ref.updatePosition();
      });
  }

  protected hasOverlayInContainer(): boolean {
    return this.overlayContainer.getContainerElement().contains(this.ref.hostElement);
  }

  protected disposeOverlayRef() {
    if (this.ref) {
      this.ref.dispose();
      this.ref = null;
      this.container = null;
    }
  }
}
