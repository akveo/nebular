import { NgModule } from '@angular/core';
import { OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';

import { NbOverlayContainerAdapter } from './overlay-container-adapter';
import { NbScrollDispatcherAdapter } from './scroll-dispatcher-adapter';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';


@NgModule({
  providers: [
    NbViewportRulerAdapter,
    NbOverlayContainerAdapter,
    { provide: OverlayContainer, useExisting: NbOverlayContainerAdapter },
    { provide: ScrollDispatcher, useClass: NbScrollDispatcherAdapter },
  ],
})
export class NbCdkAdapterModule {
}
