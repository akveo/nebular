import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbCdkModule } from '../cdk.module';
import { NbSharedModule } from '../../components/shared/shared.module';
import { NbPositionBuilderService } from './overlay-position';
import { NbTriggerBuilderService } from './overlay-trigger';
import { NbArrowedOverlayContainerComponent } from './arrowed-overlay-container/arrowed-overlay-container.component';


@NgModule({
  imports: [
    NbCdkModule,
    NbSharedModule,
  ],
  declarations: [NbArrowedOverlayContainerComponent],
  exports: [
    NbCdkModule,
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
      ],
    };
  }
}
