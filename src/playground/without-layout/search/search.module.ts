/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbSearchModule, NbSidebarModule } from '@nebular/theme';
import { SearchRoutingModule } from './search-routing.module';
import { SearchCustomizedTestComponent } from './search-customized-test.component';
import { SearchEventComponent } from './search-event.component';
import { SearchShowcaseComponent } from './search-showcase.component';
import { SearchTestComponent } from './search-test.component';

@NgModule({
  declarations: [
    SearchCustomizedTestComponent,
    SearchEventComponent,
    SearchShowcaseComponent,
    SearchTestComponent,
  ],
  imports: [
    NbSearchModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    SearchRoutingModule,
  ],
})
export class SearchModule {}
