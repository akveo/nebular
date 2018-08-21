import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { NbOverlayContainer } from './overlay-container';
import { NbPositionBuilderService } from './overlay-position';
import { NbTriggerBuilderService } from './overlay-trigger';
import { NbArrowedOverlayContainerComponent } from './arrowed-overlay-container/arrowed-overlay-container.component';
import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayService } from './overlay.service';

const CDK_MODULES = [OverlayModule, PortalModule];

@NgModule({
  imports: [
    ...CDK_MODULES,
    NbSharedModule,
  ],
  declarations: [NbArrowedOverlayContainerComponent],
  exports: [
    ...CDK_MODULES,
    NbArrowedOverlayContainerComponent,
  ],
  entryComponents: [NbArrowedOverlayContainerComponent],
})
export class NbOverlayModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbOverlayModule,
      providers: [
        NbPositionBuilderService,
        NbTriggerBuilderService,
        { provide: OverlayContainer, useClass: NbOverlayContainer },
        NbOverlayService,
      ],
    };
  }
}
