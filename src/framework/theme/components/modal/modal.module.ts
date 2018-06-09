/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbModalComponent } from './modal.component';
import { NbModalDirective } from './modal.directive';
import { NbPortalModule } from '../portal/portal.module';

@NgModule({
  imports: [NbSharedModule, NbPortalModule],
  declarations: [NbModalComponent, NbModalDirective],
  exports: [NbModalDirective],
  entryComponents: [NbModalComponent],
})
export class NbModalModule {
}
