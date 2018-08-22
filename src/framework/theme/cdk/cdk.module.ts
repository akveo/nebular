import { NgModule } from '@angular/core';
import { OverlayContainer, OverlayModule, ScrollDispatcher } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { NbOverlayPositionBuilder, NbOverlayService, NbPlatform, NbPortalDirective } from './mapping';
import { NbOverlayContainerAdapter, NbScrollDispatcherAdapter, NbViewportRulerAdapter } from './adapter/index';


const CDK_MODULES = [OverlayModule, PortalModule];

const CDK_PROVIDERS = [
  NbOverlayService,
  NbPlatform,
  NbOverlayPositionBuilder,
];

@NgModule({
  imports: [...CDK_MODULES],
  exports: [
    ...CDK_MODULES,
    NbPortalDirective,
  ],
  declarations: [NbPortalDirective],
  providers: [
    ...CDK_PROVIDERS,
    NbViewportRulerAdapter,
    { provide: OverlayContainer, useClass: NbOverlayContainerAdapter },
    { provide: ScrollDispatcher, useClass: NbScrollDispatcherAdapter },
  ],
})
export class NbCdkModule {
}
