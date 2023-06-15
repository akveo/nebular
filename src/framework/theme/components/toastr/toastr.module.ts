/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbIconModule } from '../icon/icon.module';
import { NbSharedModule } from '../shared/shared.module';

import { NbToastComponent } from './toast.component';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';

@NgModule({
  imports: [NbSharedModule, NbOverlayModule, NbIconModule],
  declarations: [NbToastrContainerComponent, NbToastComponent],
})
export class NbToastrModule {
  static forRoot(toastrConfig: Partial<NbToastrConfig> = {}): ModuleWithProviders<NbToastrModule> {
    return {
      ngModule: NbToastrModule,
      providers: [NbToastrService, NbToastrContainerRegistry, { provide: NB_TOASTR_CONFIG, useValue: toastrConfig }],
    };
  }
}
