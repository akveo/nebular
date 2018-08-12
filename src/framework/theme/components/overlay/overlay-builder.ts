import { Injectable } from '@angular/core';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { takeWhile } from 'rxjs/operators';

import { NbTriggerStrategy } from './overlay-trigger';
import { NbPositionStrategy } from './overlay-position';


type Component = ComponentType<any>;

export class NbOverlay {
  protected alive: boolean = true;

  constructor(protected overlayRef: OverlayRef,
              protected container: Component,
              protected content: Component,
              protected triggerStrategy: NbTriggerStrategy) {
    this.registerTriggerStrategy();
  }

  show() {
    const portal = new ComponentPortal(this.container);
    const containerRef = this.overlayRef.attach(portal);
    containerRef.instance.portal = new ComponentPortal(this.content);
    containerRef.instance.placement = 'right';
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

@Injectable()
export class NbOverlayBuilderService {
  private _content: Component;
  private _container: Component;
  private _positionStrategy: NbPositionStrategy;
  private _triggerStrategy: NbTriggerStrategy;

  constructor(private overlay: Overlay) {
  }

  container(container: Component): this {
    this._container = container;
    return this;
  }

  content(content: Component): this {
    this._content = content;
    return this;
  }

  positionStrategy(positionStrategy: NbPositionStrategy): this {
    this._positionStrategy = positionStrategy;
    return this;
  }

  triggerStrategy(triggerStrategy: NbTriggerStrategy): this {
    this._triggerStrategy = triggerStrategy;
    return this;
  }

  protected _overlayRef: OverlayRef;

  overlayRef(overlayRef: OverlayRef): this {
    this._overlayRef = overlayRef;
    return this;
  }

  build(): NbOverlay {
    // const overlayRef = this.overlay.create({ positionStrategy: this._positionStrategy });
    return new NbOverlay(this._overlayRef, this._container, this._content, this._triggerStrategy);
  }
}
