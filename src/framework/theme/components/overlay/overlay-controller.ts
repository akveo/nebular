import { AfterViewInit, OnDestroy } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { NbPosition, NbPositionStrategy } from './overlay-position';
import { NbTriggerStrategy } from './overlay-trigger';
import { NbOverlay, NbOverlayBuilder } from './overlay';

export abstract class NbOverlayController implements AfterViewInit, OnDestroy {
  protected abstract container: ComponentType<any>;
  protected abstract content;
  protected abstract context: Object;
  protected abstract position: NbPosition;

  protected overlay: NbOverlay;

  constructor(protected cdkOverlay: Overlay) {
  }

  ngAfterViewInit(): void {
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

    return new NbOverlayBuilder()
      .overlayRef(overlayRef)
      .container(this.container)
      .content(this.content as any)
      .context(this.context)
      .position(this.position)
      .triggerStrategy(triggerStrategy)
      .positionStrategy(positionStrategy)
      .build();
  }
}
