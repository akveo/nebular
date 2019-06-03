/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbIconModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BootstrapRoutingModule } from './bootstrap-routing.module';
import { BootstrapTestComponent } from './bootstrap-test.component';

@NgModule({
  declarations: [
    BootstrapTestComponent,
  ],
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    BootstrapRoutingModule,
    NgbModule,
  ],
})
export class BootstrapModule {
}
