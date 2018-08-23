import { ComponentRef } from '@angular/core';


export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}
