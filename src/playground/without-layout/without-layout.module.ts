/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { WithoutLayoutRoutingModule } from './without-layout-routing.module';
import { PlaygroundBaseComponent } from './playground-base.component';

@NgModule({
  declarations: [PlaygroundBaseComponent],
  imports: [WithoutLayoutRoutingModule],
})
export class WithoutLayoutModule {}
