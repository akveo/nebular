import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { NbOverlayContainer } from './overlay-container';
import { NbOverlayBuilder } from './overlay';
import { NbPositionBuilderService } from './overlay-position';
import { NbTriggerBuilderService } from './overlay-trigger';


const CDK_MODULES = [OverlayModule, PortalModule];

@NgModule({
  imports: [...CDK_MODULES],
  exports: [...CDK_MODULES],
})
export class NbOverlayModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbOverlayModule,
      providers: [
        NbPositionBuilderService,
        NbTriggerBuilderService,
        NbOverlayBuilder,
        { provide: OverlayContainer, useClass: NbOverlayContainer },
      ],
    };
  }
}
