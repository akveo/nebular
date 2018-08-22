import { ComponentRef } from '@angular/core';


export interface NbContainer {
  // TODO content should have compatible type with container
  content: any;
  context: Object;
}

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}
