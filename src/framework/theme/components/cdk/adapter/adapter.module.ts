import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainer, ScrollDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';

import { NbOverlayContainer } from '../overlay/mapping';
import { NbOverlayContainerAdapter } from './overlay-container-adapter';
import { NbScrollDispatcherAdapter } from './scroll-dispatcher-adapter';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';
import { NbBlockScrollStrategyAdapter, NbScrollStrategyOptions } from './block-scroll-strategy-adapter';


@NgModule({})
export class NbCdkAdapterModule {
  static forRoot(): ModuleWithProviders<NbCdkAdapterModule> {
    return {
      ngModule: NbCdkAdapterModule,
      providers: [
        NbViewportRulerAdapter,
        NbOverlayContainerAdapter,
        NbBlockScrollStrategyAdapter,
        NbScrollDispatcherAdapter,
        NbScrollStrategyOptions,
        { provide: OverlayContainer, useExisting: NbOverlayContainerAdapter },
        { provide: NbOverlayContainer, useExisting: NbOverlayContainerAdapter },
        { provide: ScrollDispatcher, useExisting: NbScrollDispatcherAdapter },
        { provide: ScrollStrategyOptions, useExisting: NbScrollStrategyOptions },
      ],
    };
  }
}
