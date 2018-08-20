import { ComponentRef, TemplateRef } from '@angular/core';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';

import { takeWhile } from 'rxjs/operators';
import { patch, render } from './overlay-renderer';
import { NbPosition } from './overlay-position';
import { Disposable } from './disposable';
import { NbArrowedOverlayContainerComponent } from './arrowed-overlay-container/arrowed-overlay-container.component';


export type NbOverlayContent = ComponentType<any> | TemplateRef<any> | string;

export interface NbContainer {
  content: NbOverlayContent;
  position: NbPosition;
  context: Object;
}

// TODO change name
export class NbOverlayPositionSubscriber implements Disposable {
  protected alive: boolean = true;

  constructor(protected positionStrategy, protected overlay: NbOverlay) {
    this.registerPositionStrategy();
  }

  dispose(): void {
    this.alive = false;
  }

  protected registerPositionStrategy() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => this.overlay.updatePosition(position));
  }
}

// TODO change name
export class NbOverlayTriggerSubscriber implements Disposable {
  protected alive: boolean = true;

  constructor(protected triggerStrategy, protected overlay: NbOverlay) {
    this.registerTriggerStrategy();
  }

  dispose() {
    this.alive = false;
  }

  protected registerTriggerStrategy() {
    this.registerShowTrigger();
    this.registerHideTrigger();
    this.registerToggleTrigger();
  }

  private registerShowTrigger() {
    this.triggerStrategy.show
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.overlay.show());
  }

  private registerHideTrigger() {
    this.triggerStrategy.hide
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.overlay.hide());
  }

  private registerToggleTrigger() {
    this.triggerStrategy.toggle
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.overlay.toggle());
  }
}

export class NbOverlayConfig {
  content?: NbOverlayContent;
  contentContext?: Object = {};
  container?: ComponentType<NbContainer> = NbArrowedOverlayContainerComponent;
  containerContext?: Object = {};
  position?: NbPosition = NbPosition.TOP;

  constructor(config?: NbOverlayConfig) {
    Object.assign(this, config);
  }
}

export class NbOverlay implements Disposable {
  protected container: ComponentRef<NbContainer>;

  constructor(protected overlayRef: OverlayRef,
              protected config: NbOverlayConfig) {
  }

  dispose() {
    this.overlayRef.dispose();
  }

  show() {
    this.container = render(this.overlayRef, this.config);
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

  updatePosition(position: NbPosition) {
    patch(this.container, { position });
  }
}
