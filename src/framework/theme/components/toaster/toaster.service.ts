import { ComponentRef, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { patch } from '../overlay';
import { NbToasterContainerComponent } from './toaster-container.component';
import {
  NB_TOAST_TOP_POSITIONS,
  NbToastPosition,
  NbToastPositionFactory,
} from './toaster-position.service';


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
  duration: number = 9000;
  destroyByClick: boolean = true;

  constructor(config: Partial<NbToastConfig>) {
    Object.assign(this, config);
  }
}

class NbToastContainer {
  protected toasts: NbToast[] = [];

  constructor(protected position: NbToastPosition, protected containerRef: ComponentRef<NbToasterContainerComponent>) {
  }

  attach(toast: NbToast) {
    if (NB_TOAST_TOP_POSITIONS.includes(toast.config.position)) {
      this.attachToTop(toast);
    } else {
      this.attachToBottom(toast);
    }

    if (toast.config.duration) {
      this.setDestroyTimeout(toast);
    }
  }

  protected attachToTop(toast: NbToast) {
    this.toasts.unshift(toast);
    this.updateContainer();

    if (toast.config.destroyByClick) {
      this.containerRef.instance.toasts.first.destroy.subscribe(() => this.destroy(toast));
    }
  }

  protected attachToBottom(toast: NbToast) {
    this.toasts.push(toast);
    this.updateContainer();

    if (toast.config.destroyByClick) {
      this.containerRef.instance.toasts.last.destroy.subscribe(() => this.destroy(toast));
    }
  }

  protected setDestroyTimeout(toast: NbToast) {
    setTimeout(() => this.destroy(toast), toast.config.duration);
  }

  protected destroy(toast: NbToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.updateContainer();
  }

  protected updateContainer() {
    patch(this.containerRef, { content: this.toasts, position: this.position });
  }
}

@Injectable()
export class NbToasterRegistry {
  protected overlays: Map<NbToastPosition, NbToastContainer> = new Map();

  constructor(protected cdkOverlay: Overlay, protected positionFactory: NbToastPositionFactory) {
  }

  get(position: NbToastPosition): NbToastContainer {
    if (!this.overlays.has(position)) {
      this.instantiateController(position);
    }

    return this.overlays.get(position);
  }

  protected instantiateController(position: NbToastPosition) {
    const container = this.createContainer(position);
    this.overlays.set(position, container);
  }

  protected createContainer(position: NbToastPosition): NbToastContainer {
    const positionStrategy = this.positionFactory.create(position);
    const ref = this.cdkOverlay.create({ positionStrategy });
    const containerRef = ref.attach(new ComponentPortal(NbToasterContainerComponent));
    return new NbToastContainer(position, containerRef);
  }
}

@Injectable()
export class NbToasterService {
  constructor(protected toasterRegistry: NbToasterRegistry) {
  }

  show(message, title?, config?: Partial<NbToastConfig>) {
    const container = this.toasterRegistry.get(config.position);
    const toast = { message, title, config: new NbToastConfig(config) };
    container.attach(toast);
  }

  success(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.SUCCESS });
  }

  info(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.INFO });
  }

  warning(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.WARNING });
  }

  primary(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.PRIMARY });
  }

  danger(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DANGER });
  }

  default(message, title?, config?: Partial<NbToastConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DEFAULT });
  }
}
