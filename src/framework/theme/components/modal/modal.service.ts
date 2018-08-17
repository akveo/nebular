import { Injectable } from '@angular/core';
import { NbPositionBuilderService } from '@nebular/theme/components/overlay';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


export class NbModalConfig {
  hasBackdrop?: boolean = false;
  backdropClass?: string = 'overlay-hasBackdrop';
  closeOnBackdropClick?: boolean = false;

  context?: Object;
}

@Injectable()
export class NbModalService {
  constructor(private positionBuilder: NbPositionBuilderService,
              private cdkOverlay: Overlay) {
  }

  show<T>(component: ComponentType<T>, config: NbModalConfig): OverlayRef {
    const positionStrategy = this.positionBuilder
      .global()
      .centerVertically()
      .centerHorizontally();

    const overlayRef = this.cdkOverlay.create({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });

    overlayRef.attach(new ComponentPortal(component));

    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    }

    return overlayRef;
  }
}
