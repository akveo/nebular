import { Injectable } from '@angular/core';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';

import { NbOverlayConfig, NbOverlayController, NbPositionBuilderService, NbPositionStrategy } from '../overlay';
import { NbToasterContainerComponent } from './toaster-container.component';

type NbToastContent = string;

export enum NbToastPosition {
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
}

export enum NbToastStatus {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  PRIMARY = 'primary',
  DANGER = 'danger',
  DEFAULT = 'default',
}

export class NbToast {
  title: string;
  message: string;
  config: NbToastConfig;
}

export class NbToastConfig {
  position: NbToastPosition = NbToastPosition.TOP_END;
  status: NbToastStatus = NbToastStatus.DEFAULT;
  duration: number = 3000;
  destroyByClick: boolean = true;

  constructor(config: Partial<NbToastConfig>) {
    Object.assign(this, config);
  }
}

export class NbModalController {
}

type ToasterContainerInstance = any;

export class NbToastRef {
}

@Injectable()
export class NbToastPositionFactory {
  constructor(protected positionBuilder: NbPositionBuilderService) {
  }

  create(position: NbToastPosition): GlobalPositionStrategy {
    const positionStrategy = this.positionBuilder.global();

    switch (position) {
      case NbToastPosition.TOP_START:
        return positionStrategy
          .top()
          .left();

      case NbToastPosition.TOP_END:
        return positionStrategy
          .top()
          .right();

      case NbToastPosition.TOP_LEFT:
        return positionStrategy
          .top()
          .left();

      case NbToastPosition.TOP_RIGHT:
        return positionStrategy
          .top()
          .right();

      case NbToastPosition.BOTTOM_START:
        return positionStrategy
          .bottom()
          .left();

      case NbToastPosition.BOTTOM_END:
        return positionStrategy
          .bottom()
          .right();

      case NbToastPosition.BOTTOM_LEFT:
        return positionStrategy
          .bottom()
          .left();

      case NbToastPosition.BOTTOM_RIGHT:
        return positionStrategy
          .bottom()
          .right();
    }
  }
}

export class NbToasterController extends NbOverlayController {
  protected toasts: NbToast[] = [];

  constructor(protected toastPositionFactory: NbToastPositionFactory,
              protected position: NbToastPosition,
              protected cdkOverlay: Overlay) {
    super(cdkOverlay);

    this.initOverlay();
    this.overlay.show();
  }

  prepend(toast: NbToast) {
    this.toasts.push(toast);
    this.overlay.updateContainer({ content: this.toasts });

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t !== toast);
      this.overlay.updateContainer({ content: this.toasts });
    }, toast.config.duration);
  }

  protected createPositionStrategy(): NbPositionStrategy {
    return this.toastPositionFactory.create(this.position);
  }

  protected getConfig(): NbOverlayConfig {
    return new NbOverlayConfig({
      content: this.toasts,
      container: NbToasterContainerComponent,
    });
  }
}

@Injectable()
export class NbToasterRegistry {
  protected overlays: Map<NbToastPosition, NbToasterController> = new Map();

  constructor(protected cdkOverlay: Overlay, protected positionFactory: NbToastPositionFactory) {
  }

  get(position: NbToastPosition): NbToasterController {
    if (!this.overlays.has(position)) {
      this.instantiateController(position);
    }

    return this.overlays.get(position);
  }

  protected instantiateController(position: NbToastPosition) {
    const controller = this.createController(position);
    this.overlays.set(position, controller);
  }

  protected createController(position: NbToastPosition): NbToasterController {
    return new NbToasterController(this.positionFactory, position, this.cdkOverlay);
  }
}

@Injectable()
export class NbToasterService {
  constructor(protected toasterRegistry: NbToasterRegistry) {
  }

  show(message, title?, config?: Partial<NbToastConfig>) {
    const container = this.toasterRegistry.get(config.position);
    container.prepend({
      title,
      message,
      config: new NbToastConfig(config),
    });
  }

  success(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.SUCCESS });
  }

  info(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.INFO });
  }

  warning(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.WARNING });
  }

  primary(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.PRIMARY });
  }

  danger(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.DANGER });
  }

  default(content: NbToastContent, config: NbToastConfig) {
    return this.show(content, { ...config, status: NbToastStatus.DEFAULT });
  }
}
