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
} from '../../cdk';
import { NB_DOCUMENT } from '../../theme.options';


export class NbModalConfig {
  hasBackdrop?: boolean = true;
  backdropClass?: string = 'overlay-backdrop';
  closeOnBackdropClick?: boolean = true;
  closeOnEsc?: boolean = true;

  // TODO do we need it???
  context?: Object;

  constructor(config: Partial<NbModalConfig>) {
    Object.assign(this, config);
  }
}

export class NbModalRef<T> {
  public readonly content: T;
  public readonly backdropClick$: Observable<MouseEvent>;

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

  show<T>(component: NbComponentType<T>, config: Partial<NbModalConfig> = {}): NbModalRef<T> {
    config = new NbModalConfig(config);
    const overlayRef = this.createOverlay(config);
    const componentRef = overlayRef.attach(new NbComponentPortal(component));
    return new NbModalRef(overlayRef, componentRef, config, this.document);
  }

  protected createOverlay(config: NbModalConfig): NbOverlayRef {
    const positionStrategy = this.createPositionStrategy();
    return this.overlay.create({
      positionStrategy,
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
}
