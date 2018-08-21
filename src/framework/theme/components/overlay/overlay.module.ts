import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayCdkModule } from './overlay-cdk.module';

import { NbOverlayLayoutContainer } from './overlay-container';
import { NbPositionBuilderService } from './overlay-position';
import { NbTriggerBuilderService } from './overlay-trigger';
import { NbArrowedOverlayContainerComponent } from './arrowed-overlay-container/arrowed-overlay-container.component';


@NgModule({
  imports: [
    NbOverlayCdkModule,
    NbSharedModule,
  ],
  declarations: [NbArrowedOverlayContainerComponent],
  exports: [
    NbOverlayCdkModule,
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
        { provide: OverlayContainer, useClass: NbOverlayLayoutContainer },
      ],
    };
  }
}
