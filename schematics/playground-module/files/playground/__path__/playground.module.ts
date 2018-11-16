/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbPlaygroundBaseComponent } from './playground-base.component';
import { NbPlaygroundLayoutComponent } from './playground-layout.component';
import { NbPlaygroundRoutingModule } from './playground-routing.module';

@NgModule({
  declarations: [ NbPlaygroundLayoutComponent, NbPlaygroundBaseComponent ],
  imports: [ NbPlaygroundRoutingModule ],
})
export class NbPlaygroundModule {}
