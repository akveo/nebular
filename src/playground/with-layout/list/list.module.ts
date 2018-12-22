/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbListModule, NbUserModule } from '@nebular/theme';
import { ListRoutingModule } from './list-routing.module';
import { SimpleListShowcaseComponent } from './simple-list-showcase.component';
import { UsersListShowcaseComponent } from './users-list-showcase.component';

@NgModule({
  declarations: [
    SimpleListShowcaseComponent,
    UsersListShowcaseComponent,
  ],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    NbUserModule,
    ListRoutingModule,
  ],
})
export class ListModule {}
