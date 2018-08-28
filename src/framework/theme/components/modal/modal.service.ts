import { ComponentRef, Inject, Injectable } from '@angular/core';
import { fromEvent as observableFromEvent, Observable } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import {
  NbComponentPortal,
  NbComponentType,
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
  hasBackdrop?: boolean = true;

  /**
   * Class that'll be assigned to the backdrop element.
   * */
  backdropClass?: string = 'overlay-backdrop';

  /**
   * If true then mouse clicks by backdrop will close a modal.
   * */
  closeOnBackdropClick?: boolean = true;

  /**
   * If true then escape press will close a modal.
   * */
  closeOnEsc?: boolean = true;

  /**
   * Disables scroll on content under modal if true and does nothing otherwise.
   * */
  hasScroll?: boolean = false;

  constructor(config: Partial<NbModalConfig>) {
    Object.assign(this, config);
  }
}

export class NbModalRef<T> {
  readonly content: T;
  readonly backdropClick$: Observable<MouseEvent>;

  protected alive: boolean = true;

  constructor(protected overlayRef: NbOverlayRef,
              protected componentRef: ComponentRef<T>,
              protected config: NbModalConfig,
              protected document: Document) {
    this.content = componentRef.instance;
    this.backdropClick$ = overlayRef.backdropClick();
    componentRef.location.nativeElement.focus();

    if (config.closeOnBackdropClick) {
      this.subscribeOnBackdropClick();
    }

    if (config.closeOnEsc) {
      this.subscribeOnEscapePress();
    }
  }

  hide() {
    this.alive = false;
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

@Injectable()
export class NbModalService {
  constructor(protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService,
              @Inject(NB_DOCUMENT) protected document) {
  }

  show<T>(component: NbComponentType<T>, userConfig: Partial<NbModalConfig> = {}): NbModalRef<T> {
    const config = new NbModalConfig(userConfig);
    const overlayRef = this.createOverlay(config);
    const componentRef = overlayRef.attach(new NbComponentPortal(component));

    return new NbModalRef(overlayRef, componentRef, config, this.document);
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
