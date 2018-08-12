import { OnDestroy, OnInit } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { NbPositionStrategy } from './overlay-position';
import { NbTriggerStrategy } from './overlay-trigger';
import { NbOverlay, NbOverlayBuilderService } from './overlay-builder';

export abstract class NbOverlayController implements OnInit, OnDestroy {
  protected abstract container?: ComponentType<any>;
  protected abstract content;

  protected overlay: NbOverlay;

  constructor(protected cdkOverlay: Overlay, protected overlayBuilder: NbOverlayBuilderService) {
  }

  ngOnInit(): void {
    this.overlay = this.createOverlay();
  }

  ngOnDestroy(): void {
    this.overlay.destroy();
  }

  protected abstract createPositionStrategy(): NbPositionStrategy;

  protected abstract createTriggerStrategy(overlayElement: HTMLElement): NbTriggerStrategy;

  protected createCdkOverlay(positionStrategy: NbPositionStrategy): OverlayRef {
    return this.cdkOverlay.create({ positionStrategy });
  }

  protected createOverlay(): NbOverlay {
    const positionStrategy: NbPositionStrategy = this.createPositionStrategy();
    const overlayRef: OverlayRef = this.createCdkOverlay(positionStrategy);
    const triggerStrategy: NbTriggerStrategy = this.createTriggerStrategy(overlayRef.overlayElement);

    return this.overlayBuilder
      .overlayRef(overlayRef)
      .container(this.container)
      .content(this.content as any)
      .positionStrategy(positionStrategy)
      .triggerStrategy(triggerStrategy)
      .build();
  }
}
