import { ComponentRef, Inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { fromEvent as observableFromEvent, Observable } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import {
  NbComponentPortal,
  NbFocusTrap,
  NbFocusTrapFactoryService,
  NbGlobalPositionStrategy,
  NbOverlayRef,
  NbOverlayService,
  NbPortal,
  NbPortalInjector,
  NbPositionBuilderService,
  NbScrollStrategy,
} from '../cdk';
import { NB_DOCUMENT } from '../../theme.options';


/**
 * Describes all available options that may be passed to the NbModalService.
 * */
export class NbModalConfig {
  /**
   * If true than overlay will render backdrop under a modal.
   * */
  hasBackdrop: boolean = true;

  /**
   * Class that'll be assigned to the backdrop element.
   * */
  backdropClass: string = 'overlay-backdrop';

  /**
   * If true then mouse clicks by backdrop will close a modal.
   * */
  closeOnBackdropClick: boolean = true;

  /**
   * If true then escape press will close a modal.
   * */
  closeOnEsc: boolean = true;

  /**
   * Disables scroll on content under modal if true and does nothing otherwise.
   * */
  hasScroll: boolean = false;

  /**
   * Focuses modal automatically after open if true.
   * */
  autoFocus: boolean = true;

  viewContainerRef: ViewContainerRef;

  constructor(config: Partial<NbModalConfig>) {
    Object.assign(this, config);
  }
}

/**
 * The `NbModalRef` helps to manipulate modal after it was created.
 * The modal can be dismissed by using `hide` method of the modalRef.
 * You can access rendered component as `content` property of the modalRef.
 * `backdropClick$` streams click events on the backdrop of the modal.
 * */
export class NbModalRef<T> {

  /**
   * Stream of backdrop click events.
   * */
  readonly backdropClick$: Observable<MouseEvent>;
  protected alive: boolean = true;
  protected focusTrap: NbFocusTrap;
  protected componentRef: ComponentRef<T>;

  constructor(protected overlayRef: NbOverlayRef,
              protected config: NbModalConfig,
              protected document: Document,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
    this.backdropClick$ = this.overlayRef.backdropClick();
  }

  set content(componentRef: ComponentRef<T>) {
    this.componentRef = componentRef;
    this.init();
  }

  get componentInstance(): T {
    return this.componentRef.instance;
  }

  /**
   * Hides modal.
   * */
  hide() {
    this.alive = false;
    this.focusTrap.restoreFocus();
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }

  protected init() {
    this.focusTrap = this.focusTrapFactory.create(this.componentRef.location.nativeElement);

    if (this.config.closeOnBackdropClick) {
      this.subscribeOnBackdropClick();
    }

    if (this.config.closeOnEsc) {
      this.subscribeOnEscapePress();
    }

    if (this.config.autoFocus) {
      this.focusTrap.blurPreviouslyFocusedElement();
      this.focusTrap.focusInitialElement();
    }
  }

  protected subscribeOnBackdropClick() {
    this.overlayRef.backdropClick()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.hide());
  }

  protected subscribeOnEscapePress() {
    observableFromEvent(this.document, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        filter((event: KeyboardEvent) => event.keyCode === 27),
      )
      .subscribe(() => this.hide());
  }
}

/**
 * The `NbModalService` helps to open modals.
 *
 * @stacked-example(Showcase, modal/modal-showcase.component)
 *
 * A new modal is opened by calling the `show` method with a component to be loaded and an optional configuration.
 * `show` method will return `NbModalRef` that can be used for the further manipulations.
 *
 * ```ts
 * const modalRef = this.modalService.show(MyModalComponent, { ... });
 * ```
 *
 * `NbModalRef` gives capability access reference to the rendered modal component,
 * destroy modal and some other options described below.
 *
 * ### Configuration
 *
 * As we mentioned above, `show` method of the `NbModalService` may receive optional configuration options.
 * This config may contain the following:
 *
 * `hasBackdrop` - determines is service have to render backdrop under the modal.
 * Default is true.
 * @stacked-example(Backdrop, modal/modal-has-backdrop.component)
 *
 * `closeOnBackdropClick` - close modal on backdrop click if true.
 * Default is true.
 * @stacked-example(Backdrop click, modal/modal-backdrop-click.component)
 *
 * `closeOnEsc` - close modal on escape button on the keyboard.
 * Default is true.
 * @stacked-example(Escape hit, modal/modal-esc.component)
 *
 * `hasScroll` - Disables scroll on content under modal if true and does nothing otherwise.
 * Default is false.
 * Please, open modals in the separate window and try to scroll.
 * @stacked-example(Scroll, modal/modal-scroll.component)
 *
 * `autoFocus` - Focuses modal automatically after open if true. It's useful to prevent misclicks on
 * trigger elements and opening multiple modals.
 * Default is true.
 *
 * As you can see, if you open modal with auto focus modal will focus first focusable element
 * or just blur previously focused automatically.
 * Otherwise, without auto focus, focus will stay on previously focused element.
 * Please, open modals in separate window and try to click on button without focus
 * and then hit space any times. Multiple same modals will be opened.
 * @stacked-example(Auto focus, modal/modal-auto-focus.component)
 * */
@Injectable()
export class NbModalService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService,
              protected focusTrapFactory: NbFocusTrapFactoryService,
              protected injector: Injector) {
  }

  // TODO add capability render templateRefs

  /**
   * Opens new instance of the modal, may receive optional config.
   * */
  show<T>(component: Type<T>, userConfig: Partial<NbModalConfig> = {}): NbModalRef<T> {
    const config = new NbModalConfig(userConfig);
    const overlayRef = this.createOverlay(config);

    const modalRef = new NbModalRef<T>(overlayRef, config, this.document, this.focusTrapFactory);

    const portal = this.createPortal(config, modalRef, component);

    modalRef.content = overlayRef.attach(portal);

    return modalRef;
  }

  protected createOverlay(config: NbModalConfig): NbOverlayRef {
    const positionStrategy = this.createPositionStrategy();
    const scrollStrategy = this.createScrollStrategy(config.hasScroll);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
  }

  protected createPositionStrategy(): NbGlobalPositionStrategy {
    return this.positionBuilder
      .global()
      .centerVertically()
      .centerHorizontally();
  }

  protected createScrollStrategy(hasScroll: boolean): NbScrollStrategy {
    if (hasScroll) {
      return this.overlay.scrollStrategies.noop();
    } else {
      return this.overlay.scrollStrategies.block();
    }
  }

  /**
   * We're creating portal with custom injector provided through config or using global injector.
   * This approach provides us capability inject `NbModalRef` in modal component.
   * */
  protected createPortal<T>(config: NbModalConfig, modalRef: NbModalRef<T>, component: Type<T>): NbPortal {
    const injector: Injector = this.createInjector(config);
    const portalInjector: Injector = this.createPortalInjector(injector, modalRef);
    return this.createPortalWithInjector(component, portalInjector);
  }

  protected createInjector(config: NbModalConfig): Injector {
    return config.viewContainerRef && config.viewContainerRef.injector || this.injector;
  }

  protected createPortalInjector<T>(injector: Injector, modalRef: NbModalRef<T>): Injector {
    return new NbPortalInjector(injector, new WeakMap([[NbModalRef, modalRef]]));
  }

  protected createPortalWithInjector<T>(component: Type<T>, injector: Injector): NbPortal {
    return new NbComponentPortal(component, null, injector);
  }
}
