/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';

import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbToastComponent } from './toast.component';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';


@NgModule({
  imports: [NbSharedModule, NbOverlayModule, NbIconModule],
  declarations: [NbToastrContainerComponent, NbToastComponent],
  entryComponents: [NbToastrContainerComponent, NbToastComponent],
})
export class NbToastrModule {
  static forRoot(toastrConfig: Partial<NbToastrConfig> = {}): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbToastrModule,
      providers: [
        NbToastrService,
        NbToastrContainerRegistry,
        { provide: NB_TOASTR_CONFIG, useValue: toastrConfig },
      ],
    };
  }
}
