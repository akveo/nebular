import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NbPosition } from './overlay-position';
import { NbComponentPortal, NbPortalInjector, NbPortalOutletDirective, NbTemplatePortal } from './mapping';

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
    <ng-template nbPortalOutlet></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbOverlayContainerComponent {
  @ViewChild(NbPortalOutletDirective) portalOutlet: NbPortalOutletDirective;

  isAttached: boolean = false;

  content: string;

  constructor(protected vcr: ViewContainerRef,
              protected injector: Injector, private changeDetectorRef: ChangeDetectorRef) {

  }

  get isStringContent(): boolean {
    return !!this.content;
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    portal.injector = this.createChildInjector(portal.componentFactoryResolver);
    const componentRef = this.portalOutlet.attachComponentPortal(portal);
    this.isAttached = true;
    return componentRef;
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    const templateRef = this.portalOutlet.attachTemplatePortal(portal);
    templateRef.detectChanges();
    return templateRef;
  }

  attachStringContent(content: string) {
    this.content = content;
    this.isAttached = true;
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  protected createChildInjector(cfr: ComponentFactoryResolver): NbPortalInjector {
    return new NbPortalInjector(this.injector, new WeakMap([
      [ComponentFactoryResolver, cfr],
    ]));
  }
}
