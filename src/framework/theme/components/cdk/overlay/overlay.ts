import { ComponentRef, TemplateRef, Type } from '@angular/core';

import { NbComponentPortal, NbComponentType, NbOverlayRef } from '../mapping';


export type NbOverlayContent = Type<any> | TemplateRef<any> | string;

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}

export function createContainer<T>(ref: NbOverlayRef, container: NbComponentType<T>, context: Object): ComponentRef<T> {
  const containerRef = ref.attach(new NbComponentPortal(container));
  patch(containerRef, context);
  return containerRef;
}
