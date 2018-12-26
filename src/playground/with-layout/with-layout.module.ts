/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { WithLayoutRoutingModule } from './with-layout-routing.module';
import { PlaygroundLayoutComponent } from './playground-layout.component';

@NgModule({
  declarations: [
    PlaygroundLayoutComponent,
  ],
  imports: [ NbLayoutModule, WithLayoutRoutingModule ],
})
export class WithLayoutModule {}
