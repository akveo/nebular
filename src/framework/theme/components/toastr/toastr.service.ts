import { ComponentRef, Inject, Injectable } from '@angular/core';

import { NbComponentPortal, NbOverlayService, patch } from '../cdk';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOAST_TOP_POSITIONS, NbToastPositionFactory } from './toastr-position.service';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';
import { NbToastPosition, NbToastStatus } from './model';


export class NbToast {
  title: string;
  message: string;
  config: NbToastrConfig;
}


export class NbToastContainer {
  protected toasts: NbToast[] = [];
  protected prevToast: NbToast;

  constructor(protected position: NbToastPosition, protected containerRef: ComponentRef<NbToastrContainerComponent>) {
  }

  attach(toast: NbToast) {
    if (toast.config.preventDuplicates && this.isDuplicate(toast)) {
      return;
    }

    if (NB_TOAST_TOP_POSITIONS.includes(toast.config.position)) {
      this.attachToTop(toast);
    } else {
      this.attachToBottom(toast);
    }

    if (toast.config.duration) {
      this.setDestroyTimeout(toast);
    }

    this.prevToast = toast;
  }

  protected isDuplicate(toast: NbToast): boolean {
    return this.prevToast
      && this.prevToast.message === toast.message
      && this.prevToast.title === toast.title;
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
export class NbToastrContainerRegistry {
  protected overlays: Map<NbToastPosition, NbToastContainer> = new Map();

  constructor(protected overlay: NbOverlayService, protected positionFactory: NbToastPositionFactory) {
  }

  get(position: NbToastPosition): NbToastContainer {
    if (!this.overlays.has(position)) {
      this.instantiateContainer(position);
    }

    return this.overlays.get(position);
  }

  protected instantiateContainer(position: NbToastPosition) {
    const container = this.createContainer(position);
    this.overlays.set(position, container);
  }

  protected createContainer(position: NbToastPosition): NbToastContainer {
    const positionStrategy = this.positionFactory.create(position);
    const ref = this.overlay.create({ positionStrategy });
    const containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent));
    return new NbToastContainer(position, containerRef);
  }
}

@Injectable()
export class NbToastrService {
  constructor(@Inject(NB_TOASTR_CONFIG) protected globalConfig: NbToastrConfig,
              protected containerRegistry: NbToastrContainerRegistry) {
  }

  show(message, title?, userConfig?: Partial<NbToastrConfig>) {
    const config = new NbToastrConfig({ ...this.globalConfig, ...userConfig });
    const container = this.containerRegistry.get(config.position);
    const toast = { message, title, config };
    container.attach(toast);
  }

  success(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.SUCCESS });
  }

  info(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.INFO });
  }

  warning(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.WARNING });
  }

  primary(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.PRIMARY });
  }

  danger(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DANGER });
  }

  default(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DEFAULT });
  }
}
