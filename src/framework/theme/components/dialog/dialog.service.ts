import { Inject, Injectable, Injector, Type } from '@angular/core';

import {
  NbComponentPortal,
  NbFocusTrapFactoryService,
  NbGlobalPositionStrategy,
  NbOverlayRef,
  NbOverlayService,
  NbPortal,
  NbPortalInjector,
  NbPositionBuilderService,
  NbScrollStrategy,
} from '../cdk';
import { NB_DOCUMENT } from '../../theme.options';
import { NbDialogConfig } from './dialog-config';
import { NbDialogRef } from './dialog-ref';


/**
 * The `NbDialogService` helps to open dialogs.
 *
 * @stacked-example(Showcase, dialog/dialog-showcase.component)
 *
 * A new dialog is opened by calling the `open` method with a component to be loaded and an optional configuration.
 * `open` method will return `NbDialogRef` that can be used for the further manipulations.
 *
 * ```ts
 * const dialogRef = this.dialogService.open(MyDialogComponent, { ... });
 * ```
 *
 * `NbDialogRef` gives capability access reference to the rendered dialog component,
 * destroy dialog and some other options described below.
 *
 * Also, you can inject `NbDialogRef` in dialog component.
 *
 * ```ts
 * this.dialogService.open(MyDialogComponent, { ... });
 *
 * // my-dialog.component.ts
 * constructor(protected dialogRef: NbDialogRef) {
 * }
 *
 * close() {
 *   this.dialogRef.close();
 * }
 * ```
 *
 * The dialog may return result through `NbDialogRef`. Calling component can receive this result with `onClose`
 * stream of `NbDialogRef`.
 *
 * @stacked-example(Result, dialog/dialog-result.component)
 *
 * ### Configuration
 *
 * As we mentioned above, `open` method of the `NbDialogService` may receive optional configuration options.
 * This config may contain the following:
 *
 * `hasBackdrop` - determines is service have to render backdrop under the dialog.
 * Default is true.
 * @stacked-example(Backdrop, dialog/dialog-has-backdrop.component)
 *
 * `closeOnBackdropClick` - close dialog on backdrop click if true.
 * Default is true.
 * @stacked-example(Backdrop click, dialog/dialog-backdrop-click.component)
 *
 * `closeOnEsc` - close dialog on escape button on the keyboard.
 * Default is true.
 * @stacked-example(Escape hit, dialog/dialog-esc.component)
 *
 * `hasScroll` - Disables scroll on content under dialog if true and does nothing otherwise.
 * Default is false.
 * Please, open dialogs in the separate window and try to scroll.
 * @stacked-example(Scroll, dialog/dialog-scroll.component)
 *
 * `autoFocus` - Focuses dialog automatically after open if true. It's useful to prevent misclicks on
 * trigger elements and opening multiple dialogs.
 * Default is true.
 *
 * As you can see, if you open dialog with auto focus dialog will focus first focusable element
 * or just blur previously focused automatically.
 * Otherwise, without auto focus, focus will stay on previously focused element.
 * Please, open dialogs in the separate window and try to click on the button without focus
 * and then hit space any times. Multiple same dialogs will be opened.
 * @stacked-example(Auto focus, dialog/dialog-auto-focus.component)
 * */
@Injectable()
export class NbDialogService {
  constructor(@Inject(NB_DOCUMENT) protected document,
              protected positionBuilder: NbPositionBuilderService,
              protected overlay: NbOverlayService,
              protected focusTrapFactory: NbFocusTrapFactoryService,
              protected injector: Injector) {
  }

  /**
   * Opens new instance of the dialog, may receive optional config.
   * */
  open<T>(component: Type<T>, userConfig: Partial<NbDialogConfig> = {}): NbDialogRef<T> {
    const config = new NbDialogConfig(userConfig);
    const overlayRef = this.createOverlay(config);

    const dialogRef = new NbDialogRef<T>(overlayRef, config, this.document, this.focusTrapFactory);

    const portal = this.createPortal(config, dialogRef, component);

    dialogRef.content = overlayRef.attach(portal);

    return dialogRef;
  }

  protected createOverlay(config: NbDialogConfig): NbOverlayRef {
    const positionStrategy = this.createPositionStrategy();
    const scrollStrategy = this.createScrollStrategy(config.hasScroll);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
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

  protected createScrollStrategy(hasScroll: boolean): NbScrollStrategy {
    if (hasScroll) {
      return this.overlay.scrollStrategies.noop();
    } else {
      return this.overlay.scrollStrategies.block();
    }
  }

  /**
   * We're creating portal with custom injector provided through config or using global injector.
   * This approach provides us capability inject `NbDialogRef` in dialog component.
   * */
  protected createPortal<T>(config: NbDialogConfig, dialogRef: NbDialogRef<T>, component: Type<T>): NbPortal {
    const injector: Injector = this.createInjector(config);
    const portalInjector: Injector = this.createPortalInjector(injector, dialogRef);
    return this.createPortalWithInjector(config, component, portalInjector);
  }

  protected createInjector(config: NbDialogConfig): Injector {
    return config.viewContainerRef && config.viewContainerRef.injector || this.injector;
  }

  protected createPortalInjector<T>(injector: Injector, dialogRef: NbDialogRef<T>): Injector {
    return new NbPortalInjector(injector, new WeakMap([[NbDialogRef, dialogRef]]));
  }

  protected createPortalWithInjector<T>(config: NbDialogConfig, component: Type<T>, injector: Injector): NbPortal {
    return new NbComponentPortal(component, config.viewContainerRef, injector);
  }
}
