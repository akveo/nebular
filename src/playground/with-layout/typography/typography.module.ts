/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { TypographyRoutingModule } from './typography-routing.module';
import { TypographyShowcaseComponent } from './typography-showcase.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [
    TypographyShowcaseComponent,
  ],
  imports: [
    NbCardModule,
    TypographyRoutingModule,
  ],
})
export class TypographyModule {}
