import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  Injector,
  Input,
  ViewContainerRef,
} from '@angular/core';

import { NbPosition } from './overlay-position';
import { NbComponentPortal, NbPortalInjector, NbTemplatePortal } from './mapping';

export abstract class NbPositionedContainer {
  @Input() position: NbPosition;

  @HostBinding('class.nb-overlay-top')
  get top(): boolean {
    return this.position === NbPosition.TOP
  }

  @HostBinding('class.nb-overlay-right')
  get right(): boolean {
    return this.position === NbPosition.RIGHT
  }

  @HostBinding('class.nb-overlay-bottom')
  get bottom(): boolean {
    return this.position === NbPosition.BOTTOM
  }

  @HostBinding('class.nb-overlay-left')
  get left(): boolean {
    return this.position === NbPosition.LEFT
  }
}


@Component({
  selector: 'nb-overlay-container',
  template: `
    <div *ngIf="isStringContent" class="primitive-overlay">{{ content }}</div>
  `,
})
export class NbOverlayContainerComponent {
  content: string;

  constructor(protected vcr: ViewContainerRef, protected injector: Injector) {
  }

  get isStringContent(): boolean {
    return !!this.content;
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    const factory = portal.cfr.resolveComponentFactory(portal.component);
    const injector = this.createChildInjector(portal.cfr);
    return this.vcr.createComponent(factory, null, injector);
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    return this.vcr.createEmbeddedView(portal.templateRef, portal.context);
  }

  attachStringContent(content: string) {
    this.content = content;
  }

  protected createChildInjector(cfr: ComponentFactoryResolver): NbPortalInjector {
    return new NbPortalInjector(this.injector, new WeakMap([
      [ComponentFactoryResolver, cfr],
    ]));
  }
}
