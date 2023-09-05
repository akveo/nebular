/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SearchCustomizedTestComponent } from './search-customized-test.component';
import { SearchEventComponent } from './search-event.component';
import { SearchShowcaseComponent } from './search-showcase.component';
import { SearchTestComponent } from './search-test.component';
import { SearchWithInputEventComponent } from './search-with-input-event.component';

const routes: Route[] = [
  {
    path: 'search-customized-test.component',
    component: SearchCustomizedTestComponent,
  },
  {
    path: 'search-event.component',
    component: SearchEventComponent,
  },
  {
    path: 'search-showcase.component',
    component: SearchShowcaseComponent,
  },
  {
    path: 'search-test.component',
    component: SearchTestComponent,
  },
  {
    path: 'search-with-input-event.component',
    component: SearchWithInputEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
