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
  isAttached: boolean = false;

  content: string;

  constructor(protected vcr: ViewContainerRef, protected injector: Injector) {
  }

  get isStringContent(): boolean {
    return !!this.content;
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    const factory = portal.cfr.resolveComponentFactory(portal.component);
    const injector = this.createChildInjector(portal.cfr);
    const componentRef = this.vcr.createComponent(factory, null, injector);
    this.isAttached = true;
    return componentRef;
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    const embeddedView = this.vcr.createEmbeddedView(portal.templateRef, portal.context);
    this.isAttached = true;
    return embeddedView;
  }

  attachStringContent(content: string) {
    this.content = content;
    this.isAttached = true;
  }

  protected createChildInjector(cfr: ComponentFactoryResolver): NbPortalInjector {
    return new NbPortalInjector(this.injector, new WeakMap([
      [ComponentFactoryResolver, cfr],
    ]));
  }
}
