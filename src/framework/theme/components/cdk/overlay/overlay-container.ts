import {
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

export interface NbRenderableContainer {

  /**
   * A renderContent method renders content with provided context.
   * Naturally, this job has to be done by ngOnChanges lifecycle hook, but
   * ngOnChanges hook will be triggered only if we update content or context properties
   * through template property binding syntax. But in our case we're updating these properties programmatically.
   * */
  renderContent();
}

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
})
export class NbOverlayContainerComponent {

  // TODO static must be false as of Angular 9.0.0, issues/1514
  @ViewChild(NbPortalOutletDirective, { static: true }) portalOutlet: NbPortalOutletDirective;

  isAttached: boolean = false;

  content: string;

  constructor(protected vcr: ViewContainerRef,
              protected injector: Injector, private changeDetectorRef: ChangeDetectorRef) {
  }

  get isStringContent(): boolean {
    return !!this.content;
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>, context?: Object): ComponentRef<T> {
    portal.injector = this.createChildInjector(portal.componentFactoryResolver);
    const componentRef = this.portalOutlet.attachComponentPortal(portal);
    if (context) {
      Object.assign(componentRef.instance, context);
    }
    componentRef.changeDetectorRef.markForCheck();
    componentRef.changeDetectorRef.detectChanges();
    this.isAttached = true;
    return componentRef;
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    const templateRef = this.portalOutlet.attachTemplatePortal(portal);
    templateRef.detectChanges();
    this.isAttached = true;
    return templateRef;
  }

  attachStringContent(content: string) {
    this.content = content;
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
    this.isAttached = true;
  }

  detach() {
    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }
    this.attachStringContent(null);
    this.isAttached = false
  }

  protected createChildInjector(cfr: ComponentFactoryResolver): NbPortalInjector {
    return new NbPortalInjector(this.injector, new WeakMap([
      [ComponentFactoryResolver, cfr],
    ]));
  }
}
