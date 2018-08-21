/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbPortalComponent } from './portal.component';
import { NbPortalOutlet } from './portal-outlet';

const PORTAL_COMPONENTS = [
  NbPortalComponent,
];

@NgModule({
  imports: [NbSharedModule],
  declarations: [...PORTAL_COMPONENTS],
  exports: [...PORTAL_COMPONENTS],
  entryComponents: [NbPortalComponent],
  providers: [NbPortalOutlet],
})
export class NbPortalModule {
}
