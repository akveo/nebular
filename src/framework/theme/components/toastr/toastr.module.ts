/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk';
import { NbSharedModule } from '../shared/shared.module';

import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbToastComponent } from './toast.component';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NbToastPositionFactory } from './toastr-position.service';


@NgModule({
  imports: [NbSharedModule, NbOverlayModule],
  declarations: [NbToastrContainerComponent, NbToastComponent],
  entryComponents: [NbToastrContainerComponent, NbToastComponent],
  providers: [
    NbToastrService,
    NbToastrContainerRegistry,
    NbToastPositionFactory,
  ],
})
export class NbToastrModule {
}
