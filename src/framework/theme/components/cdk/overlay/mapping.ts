import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  ModuleWithProviders,
  NgModule,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  CdkPortal,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortalOutlet,
  Portal,
  PortalInjector,
  PortalModule,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ComponentType,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayKeyboardDispatcher,
  OverlayModule,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';

import { NB_DOCUMENT } from '../../../theme.options';


@Directive({ selector: '[nbPortal]' })
export class NbPortalDirective extends CdkPortal {
}

@Directive({ selector: '[nbPortalOutlet]' })
export class NbPortalOutletDirective extends CdkPortalOutlet {
}

export class NbComponentPortal<T = any> extends ComponentPortal<T> {
  constructor(component: ComponentType<T>,
              vcr?: ViewContainerRef,
              injector?: Injector,
              public cfr?: ComponentFactoryResolver) {
    super(component, vcr, injector);
  }
}

/**
 * TODO remove after @angular/cdk@7.0.0 relased
 * */
export class NbDomPortalOutlet extends DomPortalOutlet {
  constructor(
    /** Element into which the content is projected. */
    public outletElement: Element,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private defaultInjector: Injector) {
    super(outletElement, componentFactoryResolver, appRef, defaultInjector);
  }

  /**
   * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
   * @param portal Portal to be attached
   * @returns Reference to the created component.
   */
  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    const resolver = portal.cfr || this.componentFactoryResolver;
    const componentFactory = resolver.resolveComponentFactory(portal.component);
    let componentRef: ComponentRef<T>;

    // If the portal specifies a ViewContainerRef, we will use that as the attachment point
    // for the component (in terms of Angular's component tree, not rendering).
    // When the ViewContainerRef is missing, we use the factory to create the component directly
    // and then manually attach the view to the application.
    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent(
        componentFactory,
        portal.viewContainerRef.length,
        portal.injector || portal.viewContainerRef.parentInjector);

      this.setDisposeFn(() => componentRef.destroy());
    } else {
      componentRef = componentFactory.create(portal.injector || this.defaultInjector);
      this.appRef.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });
    }
    // At this point the component has been instantiated, so we move it to the location in the DOM
    // where we want it to be rendered.
    this.outletElement.appendChild(this.getComponentRootNode(componentRef));

    return componentRef;
  }

  /** Gets the root HTMLElement for an instantiated component. */
  private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}

@Injectable()
export class NbOverlay extends Overlay {
  protected appRef: ApplicationRef;
  protected static nextUniqueId = 0;

  constructor(
    /** Scrolling strategies that can be used when creating an overlay. */
    public scrollStrategies: ScrollStrategyOptions,
    protected overlayContainer: OverlayContainer,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected positionBuilder: OverlayPositionBuilder,
    protected keyboardDispatcher: OverlayKeyboardDispatcher,
    protected injector: Injector,
    protected ngZone: NgZone,
    @Inject(NB_DOCUMENT) private document: any,
    private directionality: Directionality) {
    super(
      scrollStrategies,
      overlayContainer,
      componentFactoryResolver,
      positionBuilder,
      keyboardDispatcher,
      injector,
      ngZone,
      document,
      directionality,
    );
  }

  /**
   * Creates an overlay.
   * @param config Configuration applied to the overlay.
   * @returns Reference to the created overlay.
   */
  create(config?: OverlayConfig): OverlayRef {
    const host = this.createHostElement();
    const pane = this.createPaneElement(host);
    const portalOutlet = this.createPortalOutlet(pane);
    const overlayConfig = new OverlayConfig(config);

    overlayConfig.direction = overlayConfig.direction || this.directionality.value;

    return new OverlayRef(portalOutlet, host, pane, overlayConfig, this.ngZone,
      this.keyboardDispatcher, this.document);
  }

  /**
   * Creates the DOM element for an overlay and appends it to the overlay container.
   * @returns Newly-created pane element
   */
  protected createPaneElement(host: HTMLElement): HTMLElement {
    const pane = this.document.createElement('div');

    pane.id = `cdk-overlay-${NbOverlay.nextUniqueId++}`;
    pane.classList.add('cdk-overlay-pane');
    host.appendChild(pane);

    return pane;
  }

  /**
   * Creates the host element that wraps around an overlay
   * and can be used for advanced positioning.
   * @returns Newly-create host element.
   */
  protected createHostElement(): HTMLElement {
    const host = this.document.createElement('div');
    this.overlayContainer.getContainerElement().appendChild(host);
    return host;
  }

  /**
   * Create a DomPortalOutlet into which the overlay content can be loaded.
   * @param pane The DOM element to turn into a portal outlet.
   * @returns A portal outlet for the given DOM element.
   */
  protected createPortalOutlet(pane: HTMLElement): NbDomPortalOutlet {
    // We have to resolve the ApplicationRef later in order to allow people
    // to use overlay-based providers during app initialization.
    if (!this.appRef) {
      this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
    }

    return new NbDomPortalOutlet(pane, this.componentFactoryResolver, this.appRef, this.injector);
  }
}

@Injectable()
export class NbPlatform extends Platform {
}

@Injectable()
export class NbOverlayPositionBuilder extends OverlayPositionBuilder {
}

export class NbTemplatePortal<T = any> extends TemplatePortal<T> {
  constructor(template: TemplateRef<T>, viewContainerRef?: ViewContainerRef, context?: T) {
    super(template, viewContainerRef, context);
  }
}

export class NbOverlayContainer extends OverlayContainer {
}

export class NbFlexibleConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {
}

export class NbPortalInjector extends PortalInjector {
}

export type NbPortal<T = any> = Portal<T>;
export type NbOverlayRef = OverlayRef;
export type NbComponentType<T = any> = ComponentType<T>;
export type NbPositionStrategy = PositionStrategy;
export type NbConnectedPosition = ConnectedPosition;
export type NbConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
export type NbConnectionPositionPair = ConnectionPositionPair;
export type NbOverlayConfig = OverlayConfig;
export type NbScrollStrategyOptions = ScrollStrategyOptions;
export type NbScrollStrategy = ScrollStrategy;

const CDK_MODULES = [OverlayModule, PortalModule];

/**
 * This module helps us to keep all angular/cdk deps inside our cdk module via providing aliases.
 * Approach will help us move cdk in separate npm package and refactor nebular/theme code.
 * */
@NgModule({
  imports: [...CDK_MODULES],
  exports: [
    ...CDK_MODULES,
    NbPortalDirective,
    NbPortalOutletDirective,
  ],
  declarations: [NbPortalDirective, NbPortalOutletDirective],
})
export class NbCdkMappingModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbCdkMappingModule,
      providers: [
        NbOverlay,
        NbPlatform,
        NbOverlayPositionBuilder,
      ],
    };
  }
}
