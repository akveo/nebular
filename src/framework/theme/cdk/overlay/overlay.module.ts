import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../../components/shared/shared.module';
import { NbCdkMappingModule } from '../mapping';
import { NbAdapterModule } from '../adapter/adapter.module';
import { NbPositionBuilderService } from './overlay-position';
import { NbArrowedOverlayContainerComponent } from './arrowed-overlay-container/arrowed-overlay-container.component';


@NgModule({
  imports: [
    NbCdkMappingModule,
    NbAdapterModule,
    NbSharedModule,
  ],
  declarations: [NbArrowedOverlayContainerComponent],
  exports: [
    NbCdkMappingModule,
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
      ],
    };
  }
}
