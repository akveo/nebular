import {
  ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, TemplateRef, ViewContainerRef,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import {
  NbBlockScrollStrategy, NbComponentPortal, NbComponentType, NbOverlayPositionBuilder, NbOverlayRef, NbOverlayService,
} from '../cdk/overlay';
import { NB_DEFAULT_WINDOWS_CONFIG, NB_WINDOW_CONTENT, NbWindowConfig, NbWindowState } from './window-types';
import { NbWindowRef } from './window-ref';
import { NbWindowsContainerComponent } from './windows-container.component';
import { NbWindowComponent } from './window.component';

@Injectable()
export class NbWindowService {

  private overlayRef: NbOverlayRef;
  private windowsContainerViewRef: ViewContainerRef;
  private openWindows: NbWindowRef[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayService: NbOverlayService,
    private overlayPositionBuilder: NbOverlayPositionBuilder,
    private blockScrollStrategy: NbBlockScrollStrategy,
    @Inject(NB_DEFAULT_WINDOWS_CONFIG) private readonly defaultWindowsConfig: NbWindowConfig,
  ) {}

  open(
    windowContent: TemplateRef<any> | NbComponentType,
    windowConfig: Partial<NbWindowConfig> = {},
  ): NbWindowRef {
    if (this.windowsContainerViewRef == null) {
      this.createWindowsContainer();
    }

    const config = new NbWindowConfig(this.defaultWindowsConfig, windowConfig);
    const windowRef = new NbWindowRef(config);
    windowRef.componentRef = this.appendWindow(windowContent, config, windowRef);

    this.openWindows.push(windowRef);
    this.subscribeToEvents(windowRef);

    return windowRef;
  }

  private createWindowsContainer() {
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.noop(),
      positionStrategy: this.overlayPositionBuilder.global().bottom().right(),
      hasBackdrop: true,
    });
    const windowsContainerPortal = new NbComponentPortal(NbWindowsContainerComponent);
    const overlayRef = this.overlayRef.attach(windowsContainerPortal);
    this.windowsContainerViewRef = overlayRef.instance.viewContainerRef;
  }

  private appendWindow(
    content: TemplateRef<any> | NbComponentType,
    config: NbWindowConfig,
    windowRef: NbWindowRef,
  ): ComponentRef<NbWindowComponent> {
    const providers = [
      { provide: NB_WINDOW_CONTENT, useValue: content },
      { provide: NbWindowConfig, useValue: config },
      { provide: NbWindowRef, useValue: windowRef },
    ];
    const parentInjector = config.viewContainerRef
      ? config.viewContainerRef.injector
      : this.windowsContainerViewRef.injector;
    const injector = Injector.create({ parent: parentInjector, providers });
    const windowFactory = this.componentFactoryResolver.resolveComponentFactory(NbWindowComponent);

    return this.windowsContainerViewRef.createComponent(windowFactory, null, injector);
  }

  private subscribeToEvents(windowRef: NbWindowRef) {
    if (windowRef.config.closeOnBackdropClick) {
      this.overlayRef.backdropClick().subscribe(() => windowRef.close());
    }

    if (windowRef.config.closeOnEsc) {
      this.overlayRef.keydownEvents()
        .pipe(filter((event: KeyboardEvent) => event.keyCode === 27))
        .subscribe(() => windowRef.close());
    }

    windowRef.stateChange.subscribe(() => this.checkAndUpdateOverlay());

    windowRef.onClose.subscribe(() => {
      this.openWindows.splice(this.openWindows.indexOf(windowRef), 1);
      this.checkAndUpdateOverlay();
    });
  }

  private checkAndUpdateOverlay() {
    const fullScreenWindows = this.openWindows.filter(w => w.state === NbWindowState.FULL_SCREEN);
    if (fullScreenWindows.length > 0) {
      this.blockScrollStrategy.enable();
    } else {
      this.blockScrollStrategy.disable();
    }

    if (fullScreenWindows.some(w => w.config.hasBackdrop)) {
      this.overlayRef.backdropElement.removeAttribute('hidden');
    } else {
      this.overlayRef.backdropElement.setAttribute('hidden', '');
    }
  }
}
