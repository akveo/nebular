import { ComponentRef, TemplateRef } from '@angular/core';

import { NbComponentType } from '../mapping';


export interface NbContainer {
  content: any;
  context: Object;
}

export type NbOverlayContent = NbComponentType<any> | TemplateRef<any> | string;

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}
