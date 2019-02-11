/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFactoryResolver, ComponentRef, Inject, Injectable } from '@angular/core';

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
import { NB_DOCUMENT } from '../../theme.options';

export class NbToastRef {
  constructor(private toastContainer: NbToastContainer,
              private toast: NbToast) {
  }

  close() {
    this.toastContainer.destroy(this.toast);
  }
}

export class NbToastContainer {
  protected toasts: NbToast[] = [];
  protected prevToast: NbToast;

  get nativeElement() {
    return this.containerRef.location.nativeElement;
  }

  constructor(protected position: NbGlobalPosition,
              protected containerRef: ComponentRef<NbToastrContainerComponent>,
              protected positionHelper: NbPositionHelper) {
  }

  attach(toast: NbToast): NbToastRef {
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

    return new NbToastRef(this, toast);
  }

  destroy(toast: NbToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.updateContainer();
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

  protected updateContainer() {
    patch(this.containerRef, { content: this.toasts, position: this.position });
  }
}


@Injectable()
export class NbToastrContainerRegistry {
  protected overlays: Map<NbGlobalPosition, NbToastContainer> = new Map();

  constructor(protected overlay: NbOverlayService,
              protected positionBuilder: NbPositionBuilderService,
              protected positionHelper: NbPositionHelper,
              protected cfr: ComponentFactoryResolver,
              @Inject(NB_DOCUMENT) protected document: any) {
  }

  get(position: NbGlobalPosition): NbToastContainer {
    const logicalPosition: NbGlobalLogicalPosition = this.positionHelper.toLogicalPosition(position);

    const container = this.overlays.get(logicalPosition);
    if (!container || !this.existsInDom(container)) {
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
    const containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent, null, null, this.cfr));
    return new NbToastContainer(position, containerRef, this.positionHelper);
  }

  protected existsInDom(toastContainer: NbToastContainer): boolean {
    return this.document.contains(toastContainer.nativeElement);
  }
}

/**
 * The `NbToastrService` provides a capability to build toast notifications.
 *
 * @stacked-example(Showcase, toastr/toastr-showcase.component)
 *
 * `NbToastrService.show(message, title, config)` accepts three params, title and config are optional.
 *
 * ### Installation
 *
 * Import `NbToastrModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbToastrModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * Calling `NbToastrService.show(...)` will render new toast and return `NbToastrRef` with
 * help of which you may close newly created toast by calling `close` method.
 *
 * ```ts
 * const toastRef: NbToastRef = this.toastrService.show(...);
 * toastRef.close();
 * ```
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
  show(message, title?, userConfig?: Partial<NbToastrConfig>): NbToastRef {
    const config = new NbToastrConfig({ ...this.globalConfig, ...userConfig });
    const container = this.containerRegistry.get(config.position);
    const toast = { message, title, config };
    return container.attach(toast);
  }

  /**
   * Shows success toast with message, title and user config.
   * */
  success(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.SUCCESS });
  }

  /**
   * Shows info toast with message, title and user config.
   * */
  info(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.INFO });
  }

  /**
   * Shows warning toast with message, title and user config.
   * */
  warning(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.WARNING });
  }

  /**
   * Shows primary toast with message, title and user config.
   * */
  primary(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.PRIMARY });
  }

  /**
   * Shows danger toast with message, title and user config.
   * */
  danger(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.DANGER });
  }

  /**
   * Shows default toast with message, title and user config.
   * */
  default(message, title?, config?: Partial<NbToastrConfig>): NbToastRef {
    return this.show(message, title, { ...config, status: NbToastStatus.DEFAULT });
  }
}
