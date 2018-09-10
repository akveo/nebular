import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../../shared/shared.module';
import { NbCdkMappingModule } from './mapping';
import { NbCdkAdapterModule } from '../adapter/adapter.module';
import { NbPositionBuilderService } from './overlay-position';
import { NbOverlayContainerComponent } from './overlay-container';


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
      ],
    };
  }
}
