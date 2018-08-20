import { ComponentRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { NbPosition } from './overlay-position';
import { NbOverlayConfig, NbOverlayContent } from './overlay';


export interface NbContainer {
  content: NbOverlayContent;
  position: NbPosition;
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
