/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { WithoutStylesRoutingModule } from './without-styles-routing.module';
import { WithoutStylesComponent } from './without-styles.component';

@NgModule({
  declarations: [
    WithoutStylesComponent,
  ],
  imports: [
    WithoutStylesRoutingModule,
  ],
})
export class WithoutStylesModule {
}
