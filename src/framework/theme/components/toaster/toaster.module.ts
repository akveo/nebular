/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbPortalModule } from '../portal/portal.module';
import { NbToasterService } from './toaster.service';
import { NbToastComponent } from './toaster.component';
import { NbPositioningHelper } from './positioning.helper';

@NgModule({
  imports: [NbSharedModule, NbPortalModule],
  declarations: [NbToastComponent],
  entryComponents: [NbToastComponent],
  providers: [NbToasterService, NbPositioningHelper]
})
export class NbToasterModule {
}
