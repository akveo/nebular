import { ComponentRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { NbOverlayConfig } from './overlay';


export interface NbContainer {
  // TODO content should have compatible type with container
  content: any;
  context: Object;
}

export function render(overlayRef: OverlayRef, config: NbOverlayConfig): ComponentRef<NbContainer> {
  const portal = new ComponentPortal(config.container);
  const containerRef = overlayRef.attach(portal);

  return patch(containerRef, {
    ...config.containerContext,
    content: config.content,
    context: config.contentContext,
  });
}

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}
