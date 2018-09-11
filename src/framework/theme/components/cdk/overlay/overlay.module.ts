import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../../shared/shared.module';
import { NbCdkMappingModule } from './mapping';
import { NbPositionBuilderService } from './overlay-position';
import { NbOverlayContainerComponent } from './overlay-container';
import { NbOverlayService } from './overlay';
import { NbCdkAdapterModule } from '../adapter/adapter.module';
import { NbPositionHelper } from './position-helper';


@NgModule({
  imports: [
    NbCdkMappingModule,
    NbCdkAdapterModule,
    NbSharedModule,
  ],
  declarations: [NbOverlayContainerComponent],
  exports: [
    NbCdkMappingModule,
    NbOverlayContainerComponent,
  ],
})
export class NbOverlayModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbOverlayModule,
      providers: [
        NbPositionBuilderService,
        NbOverlayService,
        NbPositionHelper,
      ],
    };
  }
}
