/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WithoutStylesRoutingModule } from './without-styles-routing.module';
import { WithoutStylesComponent } from './without-styles.component';

@NgModule({
  declarations: [
    WithoutStylesComponent,
  ],
  imports: [
    NgbModule,
    WithoutStylesRoutingModule,
  ],
})
export class WithoutStylesModule {
}
