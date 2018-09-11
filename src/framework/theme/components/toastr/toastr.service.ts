/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentRef, Inject, Injectable } from '@angular/core';

import {
  NbComponentPortal,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbOverlayService,
  NbPositionBuilderService,
  NbPositionHelper,
  patch,
} from '../cdk';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';
import { NbToast, NbToastStatus } from './model';
import { NbToastComponent } from './toast.component';


export class NbToastContainer {
  protected toasts: NbToast[] = [];
  protected prevToast: NbToast;

  constructor(protected position: NbGlobalPosition,
              protected containerRef: ComponentRef<NbToastrContainerComponent>,
              protected positionHelper: NbPositionHelper) {
  }

  attach(toast: NbToast) {
    if (toast.config.preventDuplicates && this.isDuplicate(toast)) {
      return;
    }

    const toastComponent: NbToastComponent = this.attachToast(toast);

    if (toast.config.destroyByClick) {
      this.subscribeOnClick(toastComponent, toast);
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

  protected attachToast(toast: NbToast): NbToastComponent {
    if (this.positionHelper.isTopPosition(toast.config.position)) {
      return this.attachToTop(toast);
    } else {
      return this.attachToBottom(toast);
    }
  }

  protected attachToTop(toast: NbToast): NbToastComponent {
    this.toasts.unshift(toast);
    this.updateContainer();
    return this.containerRef.instance.toasts.first;
  }

  protected attachToBottom(toast: NbToast): NbToastComponent {
    this.toasts.push(toast);
    this.updateContainer();
    return this.containerRef.instance.toasts.last;
  }

  protected setDestroyTimeout(toast: NbToast) {
    setTimeout(() => this.destroy(toast), toast.config.duration);
  }

  protected subscribeOnClick(toastComponent: NbToastComponent, toast: NbToast) {
    toastComponent.destroy.subscribe(() => this.destroy(toast));
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
  protected overlays: Map<NbGlobalPosition, NbToastContainer> = new Map();

  constructor(protected overlay: NbOverlayService,
              protected positionBuilder: NbPositionBuilderService,
              protected positionHelper: NbPositionHelper) {
  }

  get(position: NbGlobalPosition): NbToastContainer {
    const logicalPosition: NbGlobalLogicalPosition = this.positionHelper.toLogicalPosition(position);

    if (!this.overlays.has(logicalPosition)) {
      this.instantiateContainer(logicalPosition);
    }

    return this.overlays.get(logicalPosition);
  }

  protected instantiateContainer(position: NbGlobalLogicalPosition) {
    const container = this.createContainer(position);
    this.overlays.set(position, container);
  }

  protected createContainer(position: NbGlobalLogicalPosition): NbToastContainer {
    const positionStrategy = this.positionBuilder.global().position(position);
    const ref = this.overlay.create({ positionStrategy });
    const containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent));
    return new NbToastContainer(position, containerRef, this.positionHelper);
  }
}

/**
 * The `NbToastrService` provides a capability to build toast notifications.
 *
 * @stacked-example(Showcase, toastr/toastr-showcase.component)
 *
 * `NbToastrService.show(message, title, config)` accepts three params, title and config are optional.
 *
 * Global toastr configuration may be provided through `NbToastrModule.forRoot(config)`.
 *
 * ```ts
 * imports: [
 *   NbToastrModule.forRoot(config),
 * ]
 * ```
 *
 * ### Configuration
 *
 * Config accepts following options:
 *
 * `position` - determines where on the screen toast will be rendered.
 * Default is `top-end`.
 *
 * @stacked-example(Position, toastr/toastr-positions.component)
 *
 * `status` - coloring and icon of the toast.
 * Default is `primary`
 *
 * @stacked-example(Status, toastr/toastr-statuses.component)
 *
 * `duration` - the time after which the toast will be destroyed.
 * `0` means endless toast, that may be destroyed by click only.
 * Default is 3000 ms.
 *
 * @stacked-example(Duration, toastr/toastr-duration.component)
 *
 * `destroyByClick` - provides a capability to destroy toast by click.
 * Default is true.
 *
 * @stacked-example(Destroy by click, toastr/toastr-destroy-by-click.component)
 *
 * `preventDuplicates` - don't create new toast if it has the same title and the same message with previous one.
 * Default is false.
 *
 * @stacked-example(Prevent duplicates, toastr/toastr-prevent-duplicates.component)
 *
 * `hasIcon` - if true then render toast icon.
 * `icon` - you can pass icon class that will be applied into the toast.
 *
 * @stacked-example(Has icon, toastr/toastr-icon.component)
 * */
@Injectable()
export class NbToastrService {
  constructor(@Inject(NB_TOASTR_CONFIG) protected globalConfig: NbToastrConfig,
              protected containerRegistry: NbToastrContainerRegistry) {
  }

  /**
   * Shows toast with message, title and user config.
   * */
  show(message, title?, userConfig?: Partial<NbToastrConfig>) {
    const config = new NbToastrConfig({ ...this.globalConfig, ...userConfig });
    const container = this.containerRegistry.get(config.position);
    const toast = { message, title, config };
    container.attach(toast);
  }

  /**
   * Shows success toast with message, title and user config.
   * */
  success(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.SUCCESS });
  }

  /**
   * Shows info toast with message, title and user config.
   * */
  info(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.INFO });
  }

  /**
   * Shows warning toast with message, title and user config.
   * */
  warning(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.WARNING });
  }

  /**
   * Shows primary toast with message, title and user config.
   * */
  primary(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.PRIMARY });
  }

  /**
   * Shows danger toast with message, title and user config.
   * */
  danger(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DANGER });
  }

  /**
   * Shows default toast with message, title and user config.
   * */
  default(message, title?, config?: Partial<NbToastrConfig>) {
    return this.show(message, title, { ...config, status: NbToastStatus.DEFAULT });
  }
}
