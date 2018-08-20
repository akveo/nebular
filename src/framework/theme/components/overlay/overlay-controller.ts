import { AfterViewInit, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { NbPositionStrategy } from './overlay-position';
import { NbOverlay, NbOverlayConfig, NbOverlayPositionSubscriber, NbOverlayTriggerSubscriber } from './overlay';
import { Disposable } from './disposable';


export abstract class NbOverlayController implements AfterViewInit, OnDestroy {
  protected overlay: NbOverlay;
  protected cdkOverlayRef: OverlayRef;

  constructor(protected cdkOverlay: Overlay) {
  }

  ngAfterViewInit(): void {
    this.initOverlay();
  }

  ngOnDestroy(): void {
    this.overlay.dispose();
  }

  protected abstract createPositionStrategy(): NbPositionStrategy;
  protected abstract getConfig(): NbOverlayConfig;

  protected initOverlay() {
    this.cdkOverlayRef = this.createCdkOverlay();
    this.overlay = this.createOverlay();
  }

  private createCdkOverlay(): OverlayRef {
    const config = this.getConfig();
    const positionStrategy = this.createPositionStrategy();
    return this.cdkOverlay.create({ ...config.cdkOverlayConfig, positionStrategy });
  }

  private createOverlay(): NbOverlay {
    const config = this.getConfig();
    return new NbOverlay(this.cdkOverlayRef, config);
  }
}

export abstract class NbConnectedController extends NbOverlayController implements AfterViewInit, OnDestroy {
  private triggerSubscriber: Disposable;
  private positionSubscriber: Disposable;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.subscribeOnTriggers();
    this.subscribeOnPosition();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.triggerSubscriber.dispose();
    this.positionSubscriber.dispose();
  }

  protected abstract createTriggerStrategy(overlayElement: HTMLElement);

  private subscribeOnTriggers() {
    const triggerStrategy = this.createTriggerStrategy(this.cdkOverlayRef.overlayElement);
    this.triggerSubscriber = new NbOverlayTriggerSubscriber(triggerStrategy, this.overlay);
  }

  private subscribeOnPosition() {
    const positionStrategy = this.cdkOverlayRef.getConfig().positionStrategy;
    this.positionSubscriber = new NbOverlayPositionSubscriber(positionStrategy, this.overlay);
  }
}
