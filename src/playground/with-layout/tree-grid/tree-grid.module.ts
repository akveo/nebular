/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbTreeGridModule } from '@nebular/theme';

import { TreeGridShowcaseComponent } from './tree-grid-showcase.component';
import { TreeGridRoutingModule } from './tree-grid-routing.module';

@NgModule({
  imports: [NbTreeGridModule, TreeGridRoutingModule],
  declarations: [
    TreeGridShowcaseComponent,
  ],
})
export class NameModule {
}


