import { TemplateRef } from '@angular/core';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { takeWhile } from 'rxjs/operators';

import { NbTriggerStrategy } from './overlay-trigger';
import { NbPosition, NbPositionStrategy } from './overlay-position';
import { Subscription } from 'rxjs';

export type NbContentComponent = ComponentType<any> | TemplateRef<any> | string;

export interface NbContainer {
  content: NbContentComponent;
  position: NbPosition;
  context: Object;
}

export class NbOverlay {
  protected alive: boolean = true;

  constructor(protected overlayRef: OverlayRef,
              protected container: ComponentType<NbContainer>,
              protected content: NbContentComponent,
              protected context: Object,
              protected position: NbPosition,
              protected triggerStrategy: NbTriggerStrategy,
              protected positionStrategy: NbPositionStrategy) {
    this.registerTriggerStrategy();
  }

  show() {
    const portal = new ComponentPortal(this.container);
    const containerRef = this.overlayRef.attach(portal);
    containerRef.instance.content = this.content;
    containerRef.instance.context = this.context;

    // TODO reset position of the container after position application from positionStrategy using
    const subscription: Subscription = this.positionStrategy.positionChange.subscribe(p => {
      containerRef.instance.position = p;
      containerRef.changeDetectorRef.detectChanges();
    });
    containerRef.onDestroy(() => subscription.unsubscribe());
  }

  hide() {
    this.overlayRef.detach();
  }

  toggle() {
    if (this.overlayRef.hasAttached()) {
      this.hide();
    } else {
      this.show();
    }
  }

  destroy() {
    this.alive = false;
    this.overlayRef.dispose();
  }

  protected registerTriggerStrategy() {
    this.registerShowTrigger();
    this.registerHideTrigger();
    this.registerToggleTrigger();
  }

  private registerShowTrigger() {
    this.triggerStrategy.show
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.show());
  }

  private registerHideTrigger() {
    this.triggerStrategy.hide
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.hide());
  }

  private registerToggleTrigger() {
    this.triggerStrategy.toggle
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.overlayRef.hasAttached() ? this.hide() : this.show());
  }
}

export class NbOverlayBuilder {
  protected _overlayRef: OverlayRef;
  protected _container: ComponentType<NbContainer>;
  protected _content: NbContentComponent;
  protected _context: Object;
  protected _position: NbPosition;
  protected _triggerStrategy: NbTriggerStrategy;
  protected _positionStrategy: NbPositionStrategy;

  overlayRef(overlayRef: OverlayRef): this {
    this._overlayRef = overlayRef;
    return this;
  }

  container(container: ComponentType<NbContainer>): this {
    this._container = container;
    return this;
  }

  content(content: NbContentComponent): this {
    this._content = content;
    return this;
  }

  context(context: Object): this {
    this._context = context;
    return this;
  }

  position(position: NbPosition): this {
    this._position = position;
    return this;
  }

  triggerStrategy(triggerStrategy: NbTriggerStrategy): this {
    this._triggerStrategy = triggerStrategy;
    return this;
  }

  positionStrategy(positionStrategy: NbPositionStrategy): this {
    this._positionStrategy = positionStrategy;
    return this;
  }

  build(): NbOverlay {
    return new NbOverlay(this._overlayRef, this._container, this._content,
      this._context, this._position, this._triggerStrategy, this._positionStrategy);
  }
}
