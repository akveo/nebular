/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../../cdk';
import { NbSharedModule } from '../shared/shared.module';

import { NbToasterRegistry, NbToasterService } from './toaster.service';
import { NbToastComponent } from './toast.component';
import { NbToasterContainerComponent } from './toaster-container.component';
import { NbToastPositionFactory } from './toaster-position.service';


@NgModule({
  imports: [NbSharedModule, NbOverlayModule],
  declarations: [NbToasterContainerComponent, NbToastComponent],
  entryComponents: [NbToasterContainerComponent, NbToastComponent],
  providers: [
    NbToasterService,
    NbToasterRegistry,
    NbToastPositionFactory,
  ],
})
export class NbToasterModule {
}
