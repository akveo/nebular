import { Injectable } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';

import {
  NbOverlayConfig,
  NbOverlayContent,
  NbOverlayController,
  NbPositionBuilderService,
  NbPositionStrategy,
} from '../overlay';


export class NbModalConfig {
  hasBackdrop?: boolean = false;
  backdropClass?: string = 'overlay-backdrop';
  closeOnBackdropClick?: boolean = false;

  context?: Object;
}

export interface NbModalRef {
  hide();
}

// TODO move in abstraction
class NbModalController extends NbOverlayController {
  constructor(protected positionBuilder: NbPositionBuilderService,
              protected cdkOverlay: Overlay,
              protected modalConfig: NbModalConfig,
              protected content: NbOverlayContent) {
    super(cdkOverlay);

    this.initOverlay();
    this.overlay.show();

    if (this.modalConfig.closeOnBackdropClick) {
      this.cdkOverlayRef.backdropClick().subscribe(() => this.cdkOverlayRef.detach());
    }
  }

  hide() {
    this.overlay.hide();
    this.overlay.dispose();
  }

  protected getConfig(): NbOverlayConfig {
    return new NbOverlayConfig({
      content: this.content,
      cdkOverlayConfig: {
        hasBackdrop: this.modalConfig.hasBackdrop,
        backdropClass: this.modalConfig.backdropClass,
      },
    });
  }

  protected createPositionStrategy(): NbPositionStrategy {
    return this.positionBuilder
      .global()
      .centerVertically()
      .centerHorizontally();
  }
}

@Injectable()
export class NbModalService {
  constructor(private positionBuilder: NbPositionBuilderService,
              private cdkOverlay: Overlay) {
  }

  show<T>(component: ComponentType<T>, config: NbModalConfig): NbModalRef {
    const controller = new NbModalController(this.positionBuilder, this.cdkOverlay, config, component);
    return { hide: controller.hide };
  }
}
