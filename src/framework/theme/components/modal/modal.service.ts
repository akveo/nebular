import { ComponentRef, Inject, Injectable } from '@angular/core';
import { fromEvent as observableFromEvent, Observable } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import {
  NbComponentPortal,
  NbComponentType,
  NbFocusTrap,
  NbFocusTrapFactoryService,
  NbGlobalPositionStrategy,
  NbOverlayRef,
  NbOverlayService,
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
   * Rendered component ref.
   * */
  readonly content: T;

  /**
   * Stream of backdrop click events.
   * */
  readonly backdropClick$: Observable<MouseEvent>;

  protected alive: boolean = true;
  protected focusTrap: NbFocusTrap;

  constructor(protected overlayRef: NbOverlayRef,
              protected componentRef: ComponentRef<T>,
              protected config: NbModalConfig,
              protected document: Document,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
    this.content = componentRef.instance;
    this.backdropClick$ = overlayRef.backdropClick();
    this.focusTrap = focusTrapFactory.create(componentRef.location.nativeElement);

    if (config.autoFocus) {
      this.focusTrap.blurPreviouslyFocusedElement();
      this.focusTrap.focusInitialElement();
    }

    if (config.closeOnBackdropClick) {
      this.subscribeOnBackdropClick();
    }

    if (config.closeOnEsc) {
      this.subscribeOnEscapePress();
    }
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
  constructor(protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService,
              @Inject(NB_DOCUMENT) protected document,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
  }

  // TODO add capability render templateRefs

  /**
   * Opens new instance of the modal, may receive optional config.
   * */
  show<T>(component: NbComponentType<T>, userConfig: Partial<NbModalConfig> = {}): NbModalRef<T> {
    const config = new NbModalConfig(userConfig);
    const overlayRef = this.createOverlay(config);
    const componentRef = overlayRef.attach(new NbComponentPortal(component));

    return new NbModalRef(overlayRef, componentRef, config, this.document, this.focusTrapFactory);
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
}
