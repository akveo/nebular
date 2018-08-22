import { Injectable } from '@angular/core';

import {
  NbComponentPortal,
  NbComponentType,
  NbGlobalPositionStrategy,
  NbOverlayService,
  NbPositionBuilderService,
} from '../../cdk';


export class NbModalConfig {
  hasBackdrop?: boolean = false;
  backdropClass?: string = 'overlay-backdrop';
  closeOnBackdropClick?: boolean = false;

  context?: Object;

  constructor(config: NbModalConfig) {
    Object.assign(this, config);
  }
}

export interface NbModalRef {
  hide();
}

@Injectable()
export class NbModalService {
  constructor(private positionBuilder: NbPositionBuilderService,
              private overlay: NbOverlayService) {
  }

  show<T>(component: NbComponentType<T>, config: NbModalConfig): NbModalRef {
    const positionStrategy = this.createPositionStrategy();
    const ref = this.overlay.create({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
    ref.attach(new NbComponentPortal(component));

    if (config.closeOnBackdropClick) {
      ref.backdropClick().subscribe(() => ref.detach());
    }

    return { hide: ref.detach.bind(ref) };
  }

  protected createPositionStrategy(): NbGlobalPositionStrategy {
    return this.positionBuilder
      .global()
      .centerVertically()
      .centerHorizontally();
  }
}
