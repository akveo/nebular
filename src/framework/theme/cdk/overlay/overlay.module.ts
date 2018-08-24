import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../../components/shared/shared.module';
import { NbCdkMappingModule } from '../mapping';
import { NbAdapterModule } from '../adapter/adapter.module';
import { NbPositionBuilderService } from './overlay-position';
import { NbOverlayContainerComponent } from './overlay-container';


@NgModule({
  imports: [
    NbCdkMappingModule,
    NbAdapterModule,
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
