import { Injectable } from '@angular/core';
import { ComponentType, GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';

import { NbPositionBuilderService } from '../overlay';
import { ComponentPortal } from '@angular/cdk/portal';


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
              private cdkOverlay: Overlay) {
  }

  show<T>(component: ComponentType<T>, config: NbModalConfig): NbModalRef {
    const positionStrategy = this.createPositionStrategy();
    const ref = this.cdkOverlay.create({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
    ref.attach(new ComponentPortal(component));

    if (config.closeOnBackdropClick) {
      ref.backdropClick().subscribe(() => ref.detach());
    }

    return { hide: ref.detach.bind(ref) };
  }

  protected createPositionStrategy(): GlobalPositionStrategy {
    return this.positionBuilder
      .global()
      .centerVertically()
      .centerHorizontally();
  }
}
