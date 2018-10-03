import { ComponentFactoryResolver, ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';

import {
  NbComponentPortal,
  NbComponentType,
  NbOverlay,
  NbOverlayConfig,
  NbOverlayRef,
  NbScrollStrategyOptions,
} from './mapping';
import { NbLayoutDirectionService } from '../../../services/direction.service';


export type NbOverlayContent = Type<any> | TemplateRef<any> | string;

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}

export function createContainer<T>(
  ref: NbOverlayRef,
  container: NbComponentType<T>,
  context: Object,
  componentFactoryResolver?: ComponentFactoryResolver,
  ): ComponentRef<T> {
  const containerRef = ref.attach(new NbComponentPortal(container, null, null, componentFactoryResolver));
  patch(containerRef, context);
  return containerRef;
}

@Injectable()
export class NbOverlayService {
  constructor(protected overlay: NbOverlay, protected layoutDirection: NbLayoutDirectionService) {
  }

  get scrollStrategies(): NbScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  create(config?: NbOverlayConfig): NbOverlayRef {
    const overlayRef = this.overlay.create(config);
    this.layoutDirection.onDirectionChange()
      .subscribe(dir => overlayRef.setDirection(dir));
    return overlayRef;
  }
}
